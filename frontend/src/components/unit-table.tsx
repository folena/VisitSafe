'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Card, CardHeader, CardTitle, CardContent,
} from '@/components/ui/card'
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogFooter, AlertDialogTitle, AlertDialogCancel, AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { Pencil, Trash2 } from 'lucide-react'
import { UnitForm } from './unit-form'
import { UnitFormEdit } from './unit-form-edit'
import { GenerateAssociationCodeButton } from './generate-association-code-button'
import { deleteUnit } from '@/api/client/deleteUnit'
import { useListAllUnitsFromMyCondominium } from '@/api/hooks/useListAllUnitsFromMyCondominium'

export function UnitTable() {
  const [page, setPage] = useState(0)
  const size = 10

  const { data, isLoading, refetch } = useListAllUnitsFromMyCondominium(
    { page, size },
  )

  const [openForm, setOpenForm] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState<any | null>(null)

  const handleDelete = async (id: string) => {
    await deleteUnit(id)
    refetch()
  }

  return (
    <Card>
      <CardHeader className="flex items-center">
        <CardTitle>Unidades do Condomínio</CardTitle>
        <div className="ml-auto">
          <Dialog open={openForm} onOpenChange={setOpenForm}>
            <DialogTrigger asChild>
              <Button variant="default">Criar nova unidade</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Unidade</DialogTitle>
              </DialogHeader>
              <UnitForm onSuccess={() => { setOpenForm(false); refetch() }} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bloco</TableHead>
                  <TableHead>Lote</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data?.content ?? []).map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell>{unit.block }</TableCell>
                    <TableCell>{unit.lot}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="h-8"
                              variant="outline"
                              onClick={() => {
                                setSelectedUnit(unit)
                                setOpenEdit(true)
                              }}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Editar Unidade</DialogTitle>
                            </DialogHeader>
                            <UnitFormEdit unit={selectedUnit} onSuccess={() => { setOpenEdit(false); refetch() }} />
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="h-8">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Deseja realmente remover esta unidade?
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(unit.id)}>
                                Remover
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <GenerateAssociationCodeButton unitId={unit.id} unitType="residential" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-end gap-4 mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
              >
                Anterior
              </Button>
              <span className="text-sm text-muted-foreground">
                Página {page + 1} de {data?.totalElements != null ? Math.ceil(data.totalElements / size) : 1}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                disabled={!data || data.last}
              >
                Próxima
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
