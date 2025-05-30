package br.com.visitsafe.controller.visitor;

import br.com.visitsafe.dto.visitor.VisitorExistsResponseDTO;
import br.com.visitsafe.model.enums.ReleaseTypeEnum;
import br.com.visitsafe.service.visitor.VisitorLookupService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/visitors")
@RequiredArgsConstructor
public class VisitorLookupController {

    private final VisitorLookupService visitorLookupService;

    @GetMapping("/exists")
    @Operation(summary = "Verifica se existe visitante por documento e tipo")
    public ResponseEntity<VisitorExistsResponseDTO> existsByDocumentAndType(
        @RequestParam String document,
        @RequestParam ReleaseTypeEnum type
    ) {
        boolean exists = visitorLookupService.existsByDocumentAndType(document, type);
        return ResponseEntity.ok(new VisitorExistsResponseDTO(exists));
    }
}
