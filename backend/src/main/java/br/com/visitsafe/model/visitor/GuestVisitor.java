package br.com.visitsafe.model.visitor;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "guest_visitors")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class GuestVisitor extends Visitor {}