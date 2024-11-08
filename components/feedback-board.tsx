'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image' // Импортируйте Image из next/image
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

type Idea = {
  id: number
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

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const addIdea = () => {
    if (newIdea.title && newIdea.description) {
      setIdeas([...ideas, {
        ...newIdea,
        id: Date.now(),
        votes: 0,
        tags: newIdea.tags,
        imageUrl: newIdea.imageUrl || undefined
      }])
      setNewIdea({ title: '', description: '', tags: [], author: '', imageUrl: '' })
    }
  }

  const handleVote = (id: number) => {
    setIdeas(ideas.map(idea =>
      idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
    ))
  }

  const handleTagChange = (tag: string) => {
    setNewIdea(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto p-4 bg-white dark:bg-black text-black dark:text-white max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Канбан-доска идей</h1>
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
              <Input
                type="url"
                placeholder="URL изображения"
                value={newIdea.imageUrl}
                onChange={(e) => setNewIdea({ ...newIdea, imageUrl: e.target.value })}
                className="border-2 border-gray-300 dark:border-gray-700 rounded-md shadow-inner"
              />
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
      </div>
    </div>
  )
}
