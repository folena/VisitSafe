package br.com.visitsafe;

import br.com.visitsafe.dto.AddressDTO;
import br.com.visitsafe.dto.release.*;
import br.com.visitsafe.dto.unit.EnterpriseUnitResponseDTO;
import br.com.visitsafe.dto.unit.ResidentialUnitResponseDTO;
import br.com.visitsafe.dto.unit.UnitAssociationCodeResponseDTO;
import br.com.visitsafe.dto.unit.UnitCreateRequestDTO;
import br.com.visitsafe.dto.visitor.*;
import br.com.visitsafe.model.Account;
import br.com.visitsafe.model.Vehicle;
import br.com.visitsafe.model.condominium.Condominium;
import br.com.visitsafe.model.condominium.EnterpriseCondominium;
import br.com.visitsafe.model.condominium.ResidentialCondominium;
import br.com.visitsafe.model.enums.DocumentTypeEnum;
import br.com.visitsafe.model.enums.RoleEnum;
import br.com.visitsafe.model.unit.EnterpriseUnit;
import br.com.visitsafe.model.user.AdminUser;
import br.com.visitsafe.repository.AccountRepository;
import br.com.visitsafe.repository.user.AdminUserRepository;
import br.com.visitsafe.service.condominium.EnterpriseCondominiumCreateService;
import br.com.visitsafe.service.condominium.ResidentialCondominiumCreateService;
import br.com.visitsafe.service.release.*;
import br.com.visitsafe.service.unit.EnterpriseUnitCreateService;
import br.com.visitsafe.service.unit.EnterpriseUnitReadService;
import br.com.visitsafe.service.unit.ResidentialUnitCreateService;
import br.com.visitsafe.service.unit.UnitAssociationCodeService;
import br.com.visitsafe.service.user.UserCreateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.UUID;

@SpringBootApplication
@Slf4j
@RequiredArgsConstructor
public class VisitsafeApplication {

    private final UserCreateService userCreateService;
    private final AccountRepository accountRepo;
    private final AdminUserRepository adminUserRepo;

    private final EnterpriseCondominiumCreateService enterpriseService;
    private final ResidentialCondominiumCreateService residentialService;

    private final EnterpriseUnitCreateService enterpriseUnitCreateService;
    private final ResidentialUnitCreateService residentialUnitCreateService;

    private final UnitAssociationCodeService unitAssociationCodeService;
    private final EnterpriseUnitReadService enterpriseUnitReadService;

    private final FamilyReleaseCreateService familyReleaseCreateService;
    private final GuestReleaseCreateService guestReleaseCreateService;
    private final ServiceProviderReleaseCreateService serviceProviderReleaseCreateService;
    private final DeliveryReleaseCreateService deliveryReleaseCreateService;
    private final DriverReleaseCreateService driverReleaseCreateService;

    public static void main(String[] args) {
        SpringApplication.run(VisitsafeApplication.class, args);
    }

    @Bean
    CommandLineRunner seed() {
        return args -> {
            ResidentialCondominium condominiumResidential = residentialService.create(
                    "Condomínio Residencial Central", "12345678000101");

            EnterpriseCondominium condominiumEmpresarial = enterpriseService.create(
                    "Condomínio Empresarial Central", "22345678000199");

            createAccount("admin@resindecial.com", "123456789", RoleEnum.ADMIN, condominiumResidential, DocumentTypeEnum.CPF, "ADM Residencial Florescer", "291.169.770-76");
            createAccount("porteiro@resindecial.com", "123456789", RoleEnum.EMPLOYEE, condominiumResidential, DocumentTypeEnum.CPF, "Porteiro Residencial Florescer", "999.464.320-72");
            
            createAccount("admin@empresarial.com", "123456789", RoleEnum.ADMIN, condominiumEmpresarial, DocumentTypeEnum.CPF, "ADM Empresarial Norte", "859.807.910-35");            
            createAccount("porteiro@empresarial.com", "123456789", RoleEnum.EMPLOYEE, condominiumEmpresarial, DocumentTypeEnum.CPF, "Porteiro Empresarial Norte", "315.627.040-79");
            
            createAccount("owner@residencial.com", "123456789", RoleEnum.OWNER, null, DocumentTypeEnum.CPF, "Pedro Guerra", "123.456.789-10");
            createAccount("owner@enterprise.com", "123456789", RoleEnum.OWNER, null, DocumentTypeEnum.CNPJ, "Empresa Silva", "89.103.281/0001-11");

            AdminUser adm1 = adminUserRepo.findByAccountEmail("admin@resindecial.com").orElseThrow();
            AdminUser adm2 = adminUserRepo.findByAccountEmail("admin@empresarial.com").orElseThrow();
            
            UnitCreateRequestDTO enterpriseUnitDTO = new UnitCreateRequestDTO(
                "B2", 
                "01",
                new AddressDTO("Rua das Empresas", "Centro", "São Paulo", "SP", "01000-000", null)
            );
            EnterpriseUnitResponseDTO createdEnterpriseUnit = enterpriseUnitCreateService.create(enterpriseUnitDTO, adm2);
            log.info("✅ Unidade empresarial criada com sucesso");

            UnitCreateRequestDTO residentialUnitDTO = new UnitCreateRequestDTO(
                "A2", 
                "12",
                new AddressDTO("Rua dos Moradores", "Vila", "Campinas", "SP", "13000-000", "Casa 1")
            );
            ResidentialUnitResponseDTO createdResidentialUnit = residentialUnitCreateService.create(residentialUnitDTO, adm1);
            log.info("✅ Unidade residencial criada com sucesso");

            UUID enterpriseUnitId = createdEnterpriseUnit.getId();
            EnterpriseUnit unit = enterpriseUnitReadService.findById(enterpriseUnitId);
            UnitAssociationCodeResponseDTO code = unitAssociationCodeService.generateCode(unit, adm2);
            log.info("Codigo da Empresa: " + code);
            unitAssociationCodeService.activateCode(code.getCode(), "owner@enterprise.com", DocumentTypeEnum.CNPJ);
            log.info("✅ Código de associação de unidade empresarial ativado");

            createReleases(enterpriseUnitId);
            log.info("🌱 Seed concluído. Sistema pronto!");
        };
    }

    private void createReleases(UUID unitId) {
        FamilyReleaseCreateRequestDTO familyRelease = new FamilyReleaseCreateRequestDTO();
        familyRelease.setUnitId(unitId);
        familyRelease.setValidFrom(LocalDate.now());
        familyRelease.setValidUntil(LocalDate.now().plusDays(5));
        familyRelease.setDailyStart(LocalTime.of(8, 0));
        familyRelease.setDailyEnd(LocalTime.of(20, 0));
        FamilyVisitorDTO familyVisitor = new FamilyVisitorDTO("Tio João", "11122233300", "11999998888");
        familyRelease.setVisitor(familyVisitor);
        familyReleaseCreateService.create(familyRelease);
        log.info("✅ Liberação familiar criada");

        GuestReleaseCreateRequestDTO guestRelease = new GuestReleaseCreateRequestDTO();
        guestRelease.setUnitId(unitId);
        guestRelease.setValidFrom(LocalDate.now());
        guestRelease.setValidUntil(LocalDate.now().plusDays(2));
        guestRelease.setDailyStart(LocalTime.of(10, 0));
        guestRelease.setDailyEnd(LocalTime.of(18, 0));
        GuestVisitorDTO guestVisitor = new GuestVisitorDTO("Visitante Carla", "22233344455", "11988887777");
        guestRelease.setVisitor(guestVisitor);
        guestReleaseCreateService.create(guestRelease);
        log.info("✅ Liberação para convidado criada");

        ServiceProviderReleaseCreateRequestDTO serviceRelease = new ServiceProviderReleaseCreateRequestDTO();
        serviceRelease.setUnitId(unitId);
        serviceRelease.setValidFrom(LocalDate.now());
        serviceRelease.setValidUntil(LocalDate.now().plusDays(7));
        serviceRelease.setDailyStart(LocalTime.of(9, 0));
        serviceRelease.setDailyEnd(LocalTime.of(17, 0));
        ServiceProviderVisitorDTO spVisitor = new ServiceProviderVisitorDTO("Técnico João da Net", "55566677788", "11991112222", true);
        serviceRelease.setVisitor(spVisitor);
        serviceProviderReleaseCreateService.create(serviceRelease);
        log.info("✅ Liberação para prestador criada");

        DeliveryReleaseCreateRequestDTO deliveryRelease = new DeliveryReleaseCreateRequestDTO();
        deliveryRelease.setUnitId(unitId);
        deliveryRelease.setValidFrom(LocalDate.now());
        deliveryRelease.setValidUntil(LocalDate.now().plusDays(1));
        deliveryRelease.setDailyStart(LocalTime.of(8, 0));
        deliveryRelease.setDailyEnd(LocalTime.of(21, 0));
        DeliveryVisitorDTO deliveryVisitor = new DeliveryVisitorDTO("Entregador José", "66677788899", "11991234567", new Vehicle(null, "VW", "UP", "AZUL", "AXY1234"), true);
        deliveryRelease.setVisitor(deliveryVisitor);
        deliveryReleaseCreateService.create(deliveryRelease);
        log.info("✅ Liberação para entregador criada");

        DriverReleaseCreateRequestDTO driverRelease = new DriverReleaseCreateRequestDTO();
        driverRelease.setUnitId(unitId);
        driverRelease.setValidFrom(LocalDate.now().plusDays(30));
        driverRelease.setValidUntil(LocalDate.now().plusDays(30));
        driverRelease.setDailyStart(LocalTime.of(6, 0));
        driverRelease.setDailyEnd(LocalTime.of(20, 0));
        DriverVisitorDTO driverVisitor = new DriverVisitorDTO("Motorista Fernando", "99988877766", "11998765432", new Vehicle(null, "BMW", "320I", "PRETO", "FGV1234"), true);
        driverRelease.setVisitor(driverVisitor);
        driverReleaseCreateService.create(driverRelease);
        log.info("✅ Liberação para motorista criada");

        DriverReleaseCreateRequestDTO driverRelease2 = new DriverReleaseCreateRequestDTO();
        driverRelease2.setUnitId(unitId);
        driverRelease2.setValidFrom(LocalDate.now().plusDays(60));
        driverRelease2.setValidUntil(LocalDate.now().plusDays(90));
        driverRelease2.setDailyStart(LocalTime.of(6, 0));
        driverRelease2.setDailyEnd(LocalTime.of(20, 0));
        DriverVisitorDTO driverVisitor2 = new DriverVisitorDTO("Motorista Pedro", "99988877766", "11998765432", new Vehicle(null, "BMW", "320I", "PRETO", "FGV1234"), true);
        driverRelease2.setVisitor(driverVisitor2);
        driverReleaseCreateService.create(driverRelease2);
        log.info("✅ Liberação para motorista criada");
    }

    private void createAccount(String email, String password, RoleEnum role,
                               Condominium condominium, DocumentTypeEnum docType, String name, String doc) {
        accountRepo.findByEmail(email).orElseGet(() -> {
            Account acc = Account.builder()
                    .email(email)
                    .password(password)
                    .role(role)
                    .isActive(true)
                    .build();

            switch (role) {
                case ADMIN -> userCreateService.createAdminUser(name, doc, docType, acc, condominium);
                case EMPLOYEE -> userCreateService.createEmployeeUser(name, doc, docType, acc, condominium);
                case OWNER -> {
                    if (docType == DocumentTypeEnum.CNPJ)
                        userCreateService.createEnterpriseOwnerUser(name, doc, docType, acc);
                    else
                        userCreateService.createResidentialOwnerUser(name, doc, docType, acc);
                }
            }

            log.info("✅ Conta {} criada", role);
            return acc;
        });
    }
}
