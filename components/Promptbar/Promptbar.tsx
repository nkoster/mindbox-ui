import {useContext, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {signOut} from 'next-auth/react'
import {useCreateReducer} from '@/hooks/useCreateReducer'
import {IconLogout} from '@tabler/icons-react'
import {savePrompts} from '@/utils/app/prompts'

import {OpenAIModels} from '@/types/openai'
import {Prompt} from '@/types/prompt'

import HomeContext from '@/pages/api/home/home.context'

import {PromptFolders} from './components/PromptFolders'
import {PromptbarSettings} from './components/PromptbarSettings'
import {Prompts} from './components/Prompts'

import Sidebar from '../Sidebar'
import PromptbarContext from './PromptBar.context'
import {PromptbarInitialState, initialState} from './Promptbar.state'

import {v4 as uuidv4} from 'uuid'

const Promptbar = () => {
  const {t} = useTranslation('promptbar')

  const promptBarContextValue = useCreateReducer<PromptbarInitialState>({
    initialState,
  })

  const {
    state: {prompts, defaultModelId, showPromptbar},
    dispatch: homeDispatch,
    handleCreateFolder,
  } = useContext(HomeContext)

  const {
    state: {searchTerm, filteredPrompts},
    dispatch: promptDispatch,
  } = promptBarContextValue

  const handleTogglePromptbar = () => {
    homeDispatch({field: 'showPromptbar', value: !showPromptbar})
    localStorage.setItem('showPromptbar', JSON.stringify(!showPromptbar))
  }

  const handleCreatePrompt = () => {
    if (defaultModelId) {
      const newPrompt: Prompt = {
        id: uuidv4(),
        name: `Prompt ${prompts.length + 1}`,
        description: '',
        content: '',
        model: OpenAIModels[defaultModelId],
        folderId: null,
      }

      const updatedPrompts = [...prompts, newPrompt]

      homeDispatch({field: 'prompts', value: updatedPrompts})

      savePrompts(updatedPrompts)
    }
  }

  const handleDeletePrompt = (prompt: Prompt) => {
    const updatedPrompts = prompts.filter((p) => p.id !== prompt.id)

    homeDispatch({field: 'prompts', value: updatedPrompts})
    savePrompts(updatedPrompts)
  }

  const handleUpdatePrompt = (prompt: Prompt) => {
    const updatedPrompts = prompts.map((p) => {
      if (p.id === prompt.id) {
        return prompt
      }

      return p
    })
    homeDispatch({field: 'prompts', value: updatedPrompts})

    savePrompts(updatedPrompts)
  }

  const handleDrop = (e: any) => {
    if (e.dataTransfer) {
      const prompt = JSON.parse(e.dataTransfer.getData('prompt'))

      const updatedPrompt = {
        ...prompt,
        folderId: e.target.dataset.folderId,
      }

      handleUpdatePrompt(updatedPrompt)

      e.target.style.background = 'none'
    }
  }

  useEffect(() => {
    if (searchTerm) {
      promptDispatch({
        field: 'filteredPrompts',
        value: prompts.filter((prompt) => {
          const searchable =
            prompt.name.toLowerCase() +
            ' ' +
            prompt.description.toLowerCase() +
            ' ' +
            prompt.content.toLowerCase()
          return searchable.includes(searchTerm.toLowerCase())
        }),
      })
    } else {
      promptDispatch({field: 'filteredPrompts', value: prompts})
    }
  }, [searchTerm, prompts])

  return (
    <PromptbarContext.Provider
      value={{
        ...promptBarContextValue,
        handleCreatePrompt,
        handleDeletePrompt,
        handleUpdatePrompt,
      }}
    >
      <Sidebar<Prompt>
        side={'right'}
        isOpen={showPromptbar}
        addItemButtonTitle={t('New prompt')}
        itemComponent={
          <Prompts
            prompts={filteredPrompts.filter((prompt) => !prompt.folderId)}
          />
        }
        folderComponent={<PromptFolders/>}
        items={filteredPrompts}
        searchTerm={searchTerm}
        handleSearchTerm={(searchTerm: string) =>
          promptDispatch({field: 'searchTerm', value: searchTerm})
        }
        toggleOpen={handleTogglePromptbar}
        handleCreateItem={handleCreatePrompt}
        handleCreateFolder={() => handleCreateFolder(t('New folder'), 'prompt')}
        handleDrop={handleDrop}
      />
      <div
        style={{
          position: 'fixed',
          bottom: 14,
          right: 10,
          width: '110px',
          height: '10px',
          zIndex: 1000,
          textAlign: 'right',
        }}
      >
        <button
          onClick={() => {
            signOut().then(() => {
              window.location.href = 'https://accounts.google.com/Logout'
            })
          }}
          className="flex items-center justify-end gap-2 w-full h-full text-sm font-medium text-gray-400 transition duration-300 ease-in-out border border-transparent group hover:text-white"
        >
          Sign out
          <IconLogout size={18}/>
        </button>
      </div>
    </PromptbarContext.Provider>
  )
}

export default Promptbar
