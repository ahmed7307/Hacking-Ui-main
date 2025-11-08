import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isAdmin } from '@/lib/auth';

interface AdminControlsProps {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

export default function AdminControls({ onEdit, onDelete, className = '' }: AdminControlsProps) {
  // Only render if user is admin
  if (!isAdmin()) {
    return null;
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        size="sm"
        variant="outline"
        onClick={onEdit}
        className="border-primary/30 hover:bg-primary/10"
      >
        <Pencil className="w-4 h-4 mr-1" />
        Edit
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={onDelete}
        className="border-red-500/30 hover:bg-red-500/10 text-red-500"
      >
        <Trash2 className="w-4 h-4 mr-1" />
        Delete
      </Button>
    </div>
  );
}