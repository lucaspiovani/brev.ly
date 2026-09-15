import { Copy, Trash } from '@phosphor-icons/react'
import { IconButton } from '../IconButton'

interface Link {
    id: string
    originalUrl: string
    shortUrl: string
    accessCount: number
    createdAt: string
}

interface LinkItemProps {
    link: Link
    onDelete: (id: string) => void
}

export function LinkItem({ link, onDelete }: LinkItemProps) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 py-3">
            <div className="flex min-w-0 flex-col">
                <span className="truncate font-bold text-blue-base">
                    brev.ly/{link.shortUrl}
                </span>
                <span className="truncate text-sm text-gray-500">
                    {link.originalUrl}
                </span>
            </div>

            <div className="flex shrink-0 items-center gap-3">
                <span className="text-sm text-gray-500">
                    {link.accessCount} acessos
                </span>

                <IconButton>
                    <Copy size={16} />
                </IconButton>

                <IconButton onClick={() => onDelete(link.id)}>
                    <Trash size={16} />
                </IconButton>
            </div>
        </div>
    )
}
