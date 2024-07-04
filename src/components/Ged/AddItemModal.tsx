// components/AddItemModal.tsx (Updated)
import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Radio,
  RadioGroup,
} from '@nextui-org/react';
import ToastHandler from '@/tools/ToastHandler';
import { TreeNode } from '@/types/TreeNode';
import localApi from '@/services/localAxiosApi';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  addItem: (newItem: TreeNode) => void;
  currentPath: string;
}

const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  onClose,
  addItem,
  currentPath,
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'file' | 'folder'>('folder');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (type === 'folder') {
      try {
        const path = `${currentPath}`;
        await localApi.post('/api/ged/folder', { path, name });
        addItem({ name, path, type: 'folder' });
        ToastHandler.toast('Dossier ajouté avec succès', 'success');
      } catch (error) {
        console.error('Error adding folder:', error);
        ToastHandler.toast("Erreur lors de l'ajout du dossier", 'error');
      }
    } else if (type === 'file' && file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', currentPath);
        formData.append('name', name);

        await localApi.post('/api/ged/file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        addItem({ name: file.name, path: `/${file.name}`, type: 'file' });
        ToastHandler.toast('Fichier ajouté avec succès', 'success');
      } catch (error) {
        console.error('Error adding file:', error);
        ToastHandler.toast("Erreur lors de l'ajout du fichier", 'error');
      }
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <ModalContent>
          <ModalHeader>Ajouter un nouveau local</ModalHeader>
          <ModalBody>
            <Input
              label="Name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isRequired
            />
            <div className="flex items-center gap-4">
              <RadioGroup
                name="type"
                orientation="horizontal"
                value={type}
                onChange={(e) => setType(e.target.value as 'file' | 'folder')}
              >
                <Radio value="folder">Créer un dossier</Radio>
                <Radio value="file">Ajouter un fichier</Radio>
              </RadioGroup>
            </div>
            {type === 'file' && (
              <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Fermer
            </Button>
            <Button color="success" variant="light" type="submit">
              Ajouter
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddItemModal;
