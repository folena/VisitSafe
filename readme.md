# Projeto VisitSafe

Este repositório contém a aplicação backend e frontend do sistema VisitSafe, desenvolvida em Java com Spring Boot e Next.js. O projeto tem como objetivo o controle de acesso e gestão de visitantes em condomínios, utilizando boas práticas de arquitetura de software e padrões de projeto.

## Estrutura do Projeto

O backend está organizado em pacotes por contexto de domínio:

* `controller/` - Controladores REST responsáveis pelas entradas HTTP.
* `service/` - Regras de negócio e casos de uso da aplicação.
* `model/` - Entidades do domínio.
* `repository/` - Interfaces de acesso a dados usando Spring Data JPA.
* `validation/` - Validações de regras de domínio.
* `security/` - Autenticação e autorização via JWT.
* `dto/` - Objetos de transferência de dados (input/output).
* `config/` - Configurações globais da aplicação.
* `exception/` - Exceções customizadas para regras de negócio.

O frontend está organizado de forma modular com base em contextos e uso intensivo do gerador de SDKs **Kubb**, o que permite forte tipagem baseada no contrato da API (OpenAPI).

Principais pastas do frontend:

* `api/client` - Funções de chamada à API geradas automaticamente com Kubb.
* `api/hooks` - Hooks de acesso à API para consumo nos componentes.
* `api/models` - Tipos TypeScript correspondentes aos dados trafegados.
* `api/schemas` - Schemas JSON OpenAPI para validação.
* `app/` - Rotas da aplicação (estrutura do Next.js).
* `components/` - Componentes reutilizáveis e UI.
* `lib/` - Configurações auxiliares como cliente do Kubb.
* `services/` - Integrações externas, como consulta ao ViaCEP.

## Padrões de Projeto e Arquitetura

### SOLID

A aplicação segue os cinco princípios SOLID para garantir legibilidade, manutenibilidade e extensibilidade:

* **SRP (Single Responsibility Principle):** Cada classe possui uma única responsabilidade. Exemplo: `UnitUpdateService` trata apenas da atualização de unidades.
* **OCP (Open/Closed Principle):** Uso de interfaces e polimorfismo para permitir extensão sem modificação. Exemplo: `DocumentValidatorHandler` permite adicionar novos validadores.
* **LSP (Liskov Substitution Principle):** Subtipos substituem suas superclasses de forma segura. Exemplo: `ResidentialUnit` e `EnterpriseUnit` substituem `Unit` corretamente.
* **ISP (Interface Segregation Principle):** Interfaces especializadas evitam implementações desnecessárias. Exemplo: validadores separados por tipo de documento ou usuário.
* **DIP (Dependency Inversion Principle):** Dependência em abstrações, não em implementações concretas. Utilização de interfaces e injeção de dependências pelo Spring.

### Strategy Pattern

O padrão Strategy é utilizado para separar comportamentos que variam conforme o contexto:

* Validação de documentos: Implementações como `CpfValidator` e `CnpjValidator` são usadas por um handler orquestrador.
* Atualização de campos de usuário: Handlers como `NameUpdateHandler` seguem uma interface comum para modificação de campos.
* Transição de status de liberação: Validadores seguem uma estratégia de mudança de estado por tipo.

Esse padrão evita uso excessivo de `if`/`else` ou `instanceof`, separa responsabilidades e facilita testes unitários.

### Arquitetura (Clean Architecture)

A arquitetura adotada segue conceitos inspirados na Arquitetura Limpa (Clean Architecture), com camadas bem definidas:

* Camada de Apresentação (controller): Recebe as requisições HTTP e aciona os serviços.
* Camada de Aplicação (service): Contém a lógica de negócio e coordena os casos de uso.
* Camada de Domínio (model, validation, exception): Entidades e regras de negócio centrais.
* Camada de Infraestrutura (repository, config, security): Persistência, configurações e autenticação.

## Boas Práticas Adotadas

* Organização por contexto de negócio: Cada funcionalidade possui seus pacotes e classes separadas por domínio (`unit`, `user`, `release`, etc).
* Validação contextualizada: Regras como "admin pertence ao condomínio" estão desacopladas e reutilizáveis.
* Testabilidade: A separação por interfaces e uso de DI permite testes com mocks.
* Nomenclatura expressiva: Nomes de classes e métodos seguem convenções claras sobre sua responsabilidade.
* Geração automática de SDK no frontend com base na especificação da API (OpenAPI), promovendo tipagem forte e consistência entre front e back.

## Tecnologias Utilizadas

* Java 21
* Spring Boot
* Spring Data JPA / Hibernate
* H2 Database
* JWT para autenticação
* Next.js
* TypeScript
* Kubb (geração automática de chamadas HTTP com tipagem OpenAPI)
* TailwindCSS (via shadcn/ui)

## Informações Pré-Cadastradas para Testes

Contas criadas automaticamente ao iniciar a aplicação com dados de exemplo:

**Condomínio Residencial Central**

* Admin: `admin@resindecial.com` / senha: `123456789`
* Porteiro: `porteiro@resindecial.com` / senha: `123456789`
* Proprietário: `owner@residencial.com` / senha: `123456789`

**Condomínio Empresarial Central**

* Admin: `admin@empresarial.com` / senha: `123456789`
* Porteiro: `porteiro@empresarial.com` / senha: `123456789`
* Proprietário: `owner@enterprise.com` / senha: `123456789`

**Unidades Criadas**

* Empresarial: Bloco B2, unidade 01 (associada ao proprietário empresarial)
* Residencial: Bloco A2, unidade 12 (associada ao proprietário residencial)

**Liberações Criadas** (relacionadas à unidade empresarial):

* Familiar: Tio João
* Convidado: Visitante Carla
* Prestador de serviço: Técnico João da Net
* Entregador: Entregador José
* Motoristas: Fernando e Pedro

Esses dados são úteis para testes e simulações.

## Docker Compose

O projeto inclui um arquivo `docker-compose.yml` na raiz, que permite iniciar o backend e o frontend com um único comando:

```bash
docker-compose up -d
```