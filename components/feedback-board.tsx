'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Frame } from "lucide-react"
import type { PutBlobResult } from '@vercel/blob'
import { get } from '@vercel/edge-config'

type Idea = {
  id: string
  title: string
  description: string
  votes: number
  tags: string[]
  author: string
  imageUrl?: string
}

const predefinedTags = [
  "Cinema 4D", "Photoshop", "Blender", "Unity", "Unreal Engine",
  "JavaScript", "Python", "React", "Vue.js", "Angular",
  "AI", "Machine Learning", "VR", "AR", "Blockchain",
  "Gaming", "Web Development", "Mobile Apps", "IoT", "Robotics"
]

export function FeedbackBoardComponent() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [newIdea, setNewIdea] = useState<{ title: string; description: string; tags: string[]; author: string; imageUrl: string }>({
    title: '',
    description: '',
    tags: [],
    author: '',
    imageUrl: ''
  })
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const ideasData = await get('ideas') as Record<string, Idea>
        if (ideasData) {
          const ideasArray = Object.entries(ideasData).map(([id, idea]) => ({
            id,
            ...idea
          }))
          setIdeas(ideasArray)
        }
      } catch (error) {
        console.error('Error fetching ideas:', error)
      }
    }

    fetchIdeas()
    const interval = setInterval(fetchIdeas, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return
    }

    const file = event.target.files[0]
    setIsUploading(true)

    try {
      const response = await fetch(
        `/api/upload?filename=${file.name}`,
        {
          method: 'POST',
          body: file,
        }
      )

      const newBlob = await response.json() as PutBlobResult
      setNewIdea(prev => ({
        ...prev,
        imageUrl: newBlob.url
      }))
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const addIdea = async () => {
    if (newIdea.title && newIdea.description) {
      const id = Date.now().toString()
      const newIdeaData = {
        ...newIdea,
        id,
        votes: 0,
        tags: newIdea.tags,
        imageUrl: newIdea.imageUrl || null
      }

      try {
        // Для Edge Config нам нужен серверный эндпоинт
        await fetch('/api/ideas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, idea: newIdeaData }),
        })

        setIdeas([...ideas, newIdeaData])
        setNewIdea({ title: '', description: '', tags: [], author: '', imageUrl: '' })
      } catch (error) {
        console.error('Error adding idea:', error)
      }
    }
  }

  const handleVote = async (id: string) => {
    const idea = ideas.find(i => i.id === id)
    if (idea) {
      const updatedIdea = { ...idea, votes: idea.votes + 1 }
      try {
        // Для Edge Config нам нужен серверный эндпоинт
        await fetch('/api/ideas/vote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, idea: updatedIdea }),
        })

        setIdeas(ideas.map(i => i.id === id ? updatedIdea : i))
      } catch (error) {
        console.error('Error voting:', error)
      }
    }
  }

  const handleTagChange = (tag: string) => {
    setNewIdea(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  // Остальной JSX код остается без изменений
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto p-4 bg-white dark:bg-black text-black dark:text-white max-w-3xl">
        <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
          <div className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4">
            <Frame className="w-6 h-6" />
            <span>Канбан-доска идей</span>
          </div>
          <div className="flex items-center ml-auto">
            <div className="flex items-center space-x-2">
              <Label htmlFor="dark-mode">Темная тема</Label>
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className="bg-gray-300 dark:bg-gray-700"
              />
            </div>
          </div>
        </header>
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-4 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-black dark:text-white border border-gray-400 dark:border-gray-600 shadow-md hover:shadow-lg transition-shadow duration-300">
                <span className="mr-2">+</span> Предложить идею
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-lg shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Добавить новую идею</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Заголовок идеи"
                  value={newIdea.title}
                  onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                  className="border-2 border-gray-300 dark:border-gray-700 rounded-md shadow-inner"
                />
                <Textarea
                  placeholder="Описание идеи"
                  value={newIdea.description}
                  onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                  className="border-2 border-gray-300 dark:border-gray-700 rounded-md shadow-inner"
                />
                <div className="space-y-2">
                  <Label className="text-lg font-semibold">Теги</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {predefinedTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={tag}
                          checked={newIdea.tags.includes(tag)}
                          onCheckedChange={() => handleTagChange(tag)}
                          className="border-2 border-gray-400 dark:border-gray-600 rounded-sm"
                        />
                        <label htmlFor={tag} className="text-sm font-medium leading-none">{tag}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <Input
                  placeholder="Автор"
                  value={newIdea.author}
                  onChange={(e) => setNewIdea({ ...newIdea, author: e.target.value })}
                  className="border-2 border-gray-300 dark:border-gray-700 rounded-md shadow-inner"
                />
                <div className="space-y-2">
                  <Label className="text-lg font-semibold">Изображение</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {isUploading ? 'Загрузка...' : 'Загрузить изображение'}
                    </Button>
                    {newIdea.imageUrl && (
                      <div className="relative w-16 h-16 rounded-md overflow-hidden border-2 border-gray-300 dark:border-gray-700">
                        <Image
                          src={newIdea.imageUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <Button onClick={addIdea} className="bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                  Добавить идею
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <div className="grid grid-cols-1 gap-4">
            {ideas.map(idea => (
              <Card key={idea.id} className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-black border-2 border-gray-300 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-b from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-t-lg border-b border-gray-300 dark:border-gray-600">
                  <CardTitle className="text-xl font-bold">{idea.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="mb-4">{idea.description}</p>
                  {idea.imageUrl && (
                    <Image src={idea.imageUrl} alt={idea.title} width={600} height={200} className="mb-4 rounded-md w-full h-40 object-cover border-2 border-gray-300 dark:border-gray-700 shadow-md" />
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {idea.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {idea.author && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">Автор: {idea.author}</p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-b-lg border-t border-gray-300 dark:border-gray-600">
                  <Button variant="outline" onClick={() => handleVote(idea.id)} className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                    Голосовать
                  </Button>
                  <span className="text-sm font-semibold bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full shadow-inner">
                    Голосов: {idea.votes}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}