import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import TodoForm from './TodoForm'

export default function AddTaskModal({ isOpen, onClose, onTodoAdded }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <DialogTitle className="text-lg font-medium text-gray-900 mb-4">
            Add New Task
          </DialogTitle>

          <TodoForm
            onTodoAdded={(todo) => {
              onTodoAdded(todo)
              onClose()
            }}
          />

          <div className="mt-4 text-right w-full">
            <button
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 w-full"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
