'use client';

import { MouseEventHandler } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, FileIcon, Mail, Phone, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserActionsProps {
  user: {
    passportFront: string;
    passportBack: string;
    tradeLicense: string;
    emiratesId: string;
  };
}

const openInNewTab = (url:string) => {
  window.open(url as unknown as string, '_blank');
};

const UserActions: React.FC<UserActionsProps> = ({ user }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button aria-haspopup="true" size="icon" variant="ghost">
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">Toggle menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      {user.passportFront && (
        <DropdownMenuItem onClick={() => openInNewTab(user.passportFront)}>
          <ImageIcon className="h-4 w-4 mr-2" />
          View Passport Front
        </DropdownMenuItem>
      )}
      {user.passportBack && (
        <DropdownMenuItem onClick={() => openInNewTab(user.passportBack)}>
          <ImageIcon className="h-4 w-4 mr-2" />
          View Passport Back
        </DropdownMenuItem>
      )}
      {user.tradeLicense && (
        <DropdownMenuItem onClick={() => openInNewTab(user.tradeLicense)}>
          <FileIcon className="h-4 w-4 mr-2" />
          View Trade License
        </DropdownMenuItem>
      )}
      {user.emiratesId && (
        <DropdownMenuItem onClick={() => openInNewTab(user.emiratesId)}>
          <FileIcon className="h-4 w-4 mr-2" />
          View Emirates ID
        </DropdownMenuItem>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserActions;
