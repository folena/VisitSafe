package br.com.visitsafe.model.release;

import br.com.visitsafe.model.enums.ReleaseApprovalStatusEnum;
import br.com.visitsafe.model.visitor.ServiceProviderVisitor;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Table(name = "service_provider_releases")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ServiceProviderRelease extends Release {

    @ManyToOne(optional = false)
    private ServiceProviderVisitor visitor;

    private Boolean isExceptional;

    @Enumerated(EnumType.STRING)
    private ReleaseApprovalStatusEnum approvalStatus;

    @Column(name = "actual_entry_time")
    private OffsetDateTime actualEntryTime;

    @Column(name = "actual_exit_time")
    private OffsetDateTime actualExitTime;

    @Column(name = "late_exit_justification")
    private String lateExitJustification;

    @Column(name = "rejection_justification")
    private String rejectionJustification;

    @Lob
    @Column(name = "justification_image", columnDefinition = "BLOB")
    private byte[] justificationImage;

    @Column(name = "justification_image_type")
    private String justificationImageType;

    @Column(name = "resident_notified")
    private Boolean residentNotified = false;

    @Column(name = "resident_notification_time")
    private OffsetDateTime residentNotificationTime;
}