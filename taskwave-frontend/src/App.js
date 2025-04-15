import React, { useState } from 'react'
import TodoList from './components/TodoList'
import AddTaskModal from './components/AddTaskModal'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'


const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: 'https://media.licdn.com/dms/image/v2/D4E03AQHgU0hk1tJ6TQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726264344959?e=1750291200&v=beta&t=vnIKtNp_i560QPGDywakYnWk-aCmTX8RbtVX09oezdg'
}

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState('all') // Manage the filter state here

  const handleTodoAdded = (newTodo) => {
    console.log('New todo added:', newTodo)
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="size-8"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <button
                      onClick={() => setFilter('all')}
                      className={classNames(
                        filter === 'all' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilter('active')}
                      className={classNames(
                        filter === 'active' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setFilter('completed')}
                      className={classNames(
                        filter === 'completed' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      Completed
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <PlusIcon aria-hidden="true" className="size-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                      </MenuButton>
                    </div>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </Disclosure>

        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">TaskWave</h1>
          </div>
        </header>

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="min-h-screen bg-gray-100 py-8 px-4">
              <div className="max-w-3xl mx-auto">
                {/* Pass filter state and setFilter function to TodoList */}
                <TodoList filter={filter} setFilter={setFilter} />

                <div className="text-right mt-4">
                  {/* Add New Task button */}
                </div>

                <AddTaskModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onTodoAdded={handleTodoAdded}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
