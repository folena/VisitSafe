package br.com.visitsafe.model.visitor;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "family_visitors")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class FamilyVisitor extends Visitor {}