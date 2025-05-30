import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'
import type { OwnerRequest } from '@/api/models/OwnerRequest'
import { OwnerApprovalDialog } from './approve-owner-modal'

export const ownerColumns = (
  reject: (id: string) => void,
  revoke: (id: string) => void,  // Função revogar recebida como parâmetro
  isFinished: boolean,
  onApproved?: () => void
): ColumnDef<OwnerRequest>[] => [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: 'documentType',
    header: 'Tipo Documento',
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: 'documentNumber',
    header: 'Número Documento',
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const request = row.original
      const id = request.id

      if (!id) return <span className="text-xs italic">sem id</span> // Confirme que o ID existe aqui

      const isApproved = request.approved === true;

      return isFinished ? (
        <Button
          size="sm"
          variant="ghost"
          className={`bg-yellow-500 text-white hover:bg-yellow-400 ${isApproved ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={() => { revoke(id) }
          } 
          disabled={isApproved}
        >
          Revogar
        </Button>
      ) : (
        <div className="flex gap-2">
          <OwnerApprovalDialog
            request={request}
            onApproved={onApproved}
          />
          <Button
            size="sm"
            variant="ghost"
            className="text-red-600 hover:bg-red-50 border border-red-200 rounded-md shadow-sm hover:shadow-md"
            onClick={() => reject(id)}
          >
            <XIcon className="mr-1 size-4" /> Recusar
          </Button>
        </div>
      )
    },
  },
]
