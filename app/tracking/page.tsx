'use client';
import { useState } from 'react';
import { Copy, Check, ThumbsUp, ThumbsDown, Globe, Instagram, Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tweet } from 'react-tweet';
import Image from 'next/image';

interface Command {
  text: string;
  copied: boolean;
}

export default function TrackingPage() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates({ ...copiedStates, [text]: true });
      setTimeout(() => {
        setCopiedStates({ ...copiedStates, [text]: false });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const CommandBlock = ({ command }: { command: string }) => (
    <div className="relative group bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-700">
      <pre className="overflow-x-auto font-mono text-sm">{command}</pre>
      <Button
        variant="outline"
        size="sm"
        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => handleCopy(command)}
      >
        {copiedStates[command] ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex justify-end mb-8">
            <Button
              variant="outline"
              onClick={() => setIsEnglish(!isEnglish)}
              className="font-semibold"
            >
              {isEnglish ? 'RU' : 'EN'}
            </Button>
          </div>
          <h1 className="text-5xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            {isEnglish ? 'YOLOv7 Tracking Installation' : 'Установка YOLOv7 Tracking'}
          </h1>
       
        </header>

        {/* Main Content */}
        <main className="space-y-16">
          {/* Story Section */}
          <section className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold mb-6">
                {isEnglish ? 'Background Story' : 'Предыстория'}
              </h2>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  {isEnglish 
                    ? "In 2023, I discovered this method and tried to push it and apply it wherever possible. In the same year, I successfully defended my bachelor's thesis on this topic. Over time, I began to find unnatural attempts to replicate it. People were doing it with AE and manually. This implementation approach violates my entire ideology, as I believe that true cyberpunk shouldn't be fake."
                    : "В 2023 году я открыл этот способ, пытался его пропушить и применять где только можно. В том же году успешно защитил диплом бакалавра на эту тему. Спустя время начал находить неестественные попытки это повторить. Ребята делали это с помощью AE и собственноручно. Такой способ реализации нарушает всю мою идеологию, ибо я считаю что настоящий вебпанк не должен быть фейковым."}
                </p>
                <p className="text-lg leading-relaxed">
                  {isEnglish
                    ? "While not claiming uniqueness, after a year, I'm rolling this out to the network so that as many people as possible know how to do it properly."
                    : "Не претендую на уникальность, но спустя год раскатываю это в сеть чтобы как можно больше людей знали как делать нужно."}
                </p>
              </div>
            </div>
          </section>

          {/* Original Implementation */}
          <section>
          
            <div className="flex justify-center mb-6">
              <Tweet id="1840363786189865282" />
            </div>
          </section>

          {/* Credits Section */}
          <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">
              {isEnglish ? 'Credits' : 'Благодарности'}
            </h2>
            <p className="text-lg mb-6">
              {isEnglish
                ? "Please don't forget to star the repositories of the developers whose work is used here:"
                : "Обязательно проставьте звезды на разработки ребят, которые используются тут:"}
            </p>
            <div className="space-y-4">
              <a 
                href="https://github.com/WongKinYiu/yolov7"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-lg"
              >
                • WongKinYiu/yolov7
              </a>
              <a 
                href="https://github.com/haroonshakeel/yolov7-object-tracking"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-lg"
              >
                • haroonshakeel/yolov7-object-tracking
              </a>
            </div>
          </section>

          {/* Demo Video */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">
              {isEnglish ? 'Implementation Example' : 'Пример реализации'}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/WNg7tI_S-C8"
                  title="YOLOv7 Tracking Example"
                  allowFullScreen
                />
              </div>
            </div>
          </section>

          {/* Support Button */}
          <section className="flex justify-center">
            <a 
              href="https://t.me/speeshspeesh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 text-lg"
            >
              {isEnglish ? '🚀 Support me' : '🚀 поддержать  (просто подпишись)'}
            </a>
          </section>

          {/* Installation Guide */}
          <section>
            <h2 className="text-4xl font-bold text-center mb-12">
              {isEnglish ? 'Installation Guide' : 'Руководство по установке'}
            </h2>

            {/* Prerequisites */}
            <section className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isEnglish ? 'Prerequisites' : 'Предварительные требования'}
              </h2>
              <div className="space-y-4">
                {[
                  { name: 'Git', url: 'https://git-scm.com/downloads' },
                  { name: 'Python', url: 'https://www.python.org/' },
                  { name: 'Anaconda', url: 'https://www.anaconda.com/download' }
                ].map((tool) => (
                  <div key={tool.name} className="flex items-center space-x-2">
                    <span>• {tool.name} -</span>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {isEnglish ? 'Download' : 'Скачать'}
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Installation Steps */}
            <div className="space-y-8">
              {/* Step 1 */}
              <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  {isEnglish ? 'Step 1: Prepare Working Directory' : 'Шаг 1: Подготовка рабочей папки'}
                </h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>{isEnglish ? 'Create a project folder (e.g., "D:\\Projects\\YOLOv7_tracking")' : 'Создайте папку для проекта (например, "D:\\Projects\\YOLOv7_tracking")'}</li>
                  <li>{isEnglish ? 'Open this folder' : 'Откройте эту папку'}</li>
                  <li>{isEnglish ? 'Right-click in an empty space' : 'Нажмите правой кнопкой мыши в пустом месте'}</li>
                  <li>{isEnglish ? 'Select "Open in Terminal"' : 'Выберите "Открыть в терминале"'}</li>
                </ol>
              </section>

              {/* Step 2 */}
              <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  {isEnglish ? 'Step 2: Clone Repositories' : 'Шаг 2: Клонирование репозиториев'}
                </h3>
                <div className="space-y-4">
                  <CommandBlock command="git clone https://github.com/WongKinYiu/yolov7.git" />
                  <CommandBlock command="git clone https://github.com/haroonshakeel/yolov7-object-tracking" />
                </div>
              </section>

              {/* Step 3 */}
              <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  {isEnglish ? 'Step 3: Copy Necessary Files' : 'Шаг 3: Копирование необходимых файлов'}
                </h3>
                <p className="mb-4">
                  {isEnglish 
                    ? 'Copy the following files from the yolov7-object-tracking repository to the yolov7 folder:'
                    : 'Скопируйте следующие файлы из репозитория yolov7-object-tracking в папку yolov7:'}
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>detect_or_track.py</li>
                  <li>sort </li>
                  <li>requirements.txt</li>
                  <li>requirements_gpu.txt</li>
                  <li>street.mp4</li>
                </ul>
              </section>

              {/* Step 4 */}
              <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  {isEnglish ? 'Step 4: Create and Activate Conda Environment' : 'Шаг 4: Создание и активация conda окружения'}
                </h3>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6">
                  <p className="font-semibold mb-2">
                    {isEnglish ? 'Important:' : 'Важно:'}
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>{isEnglish ? 'Press the Windows key and type "Anaconda Prompt" in the search bar' : 'Нажмите кнопку Windows и введите "Anaconda Prompt" в поиске'}</li>
                    <li>{isEnglish ? 'Run "Anaconda Prompt (Anaconda3)"' : 'Запустите "Anaconda Prompt (Anaconda3)"'}</li>
                    <li>{isEnglish ? 'In the opened window, navigate to your project folder:' : 'В открывшемся окне перейдите в папку вашего проекта:'}</li>
                  </ol>
                </div>
                <div className="space-y-4">
                  <CommandBlock command='cd "D:\Projects\YOLOv7_tracking\yolov7"' />
                  <CommandBlock command="conda create -n yolov7_tracking python=3.9" />
                  <CommandBlock command="conda activate yolov7_tracking" />
                </div>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  {isEnglish 
                    ? 'Note: Replace the path with your project location'
                    : 'Примечание: Замените путь на тот, где находится ваш проект'}
                </p>
              </section>

              {/* Step 5 */}
              <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  {isEnglish ? 'Step 5: Install Dependencies' : 'Шаг 5: Установка зависимостей'}
                </h3>
                <div className="space-y-4">
                  <CommandBlock command="pip install -r requirements.txt" />
                  <CommandBlock command="pip install -r requirements_gpu.txt" />
                  <CommandBlock command="pip install numpy==1.24.3" />
                </div>
              </section>

              {/* Step 6 */}
              <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  {isEnglish ? 'Step 6: Run Tracking' : 'Шаг 6: Запуск трекинга'}
                </h3>
                <CommandBlock 
                  command="python detect_or_track.py --weights yolov7.pt --no-trace --view-img --source street.mp4 --seed 2 --track --classes 0 --show-track --nobbox"
                />
                <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    {isEnglish 
                      ? 'Note: Replace "street.mp4" with the name of your video file that you put in the folder'
                      : 'Примечание: Замените "street.mp4" на название вашего видеофайла, который вы поместили в папку'}
                  </p>
                  <p>
                    {isEnglish 
                      ? 'Experiment with different flags, explore the documentation, and try to create something new. This example is a ready-made solution, but you can innovate and develop your own approaches!'
                      : 'Экспериментируйте с флагами, изучите документацию и пробуйте создать что-то новое. Данный пример - это уже готовое решение, но вы можете придумать свои подходы!'}
                  </p>
                </div>
              </section>
            </div>
          </section>
        </main>

        {/* Social Links */}
        <footer className="mt-12 text-center space-y-4">
          <div className="flex justify-center gap-6">
            <a 
              href="https://rbdclan.moscow/speesh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <Globe className="h-5 w-5" />
              <span>RBD Clan</span>
            </a>
            <a 
              href="https://instagram.com/speeshspeesh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <Instagram className="h-5 w-5" />
              <span>Instagram</span>
            </a>
            <a 
              href="https://www.youtube.com/@w36lord" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <Youtube className="h-5 w-5" />
              <span>YouTube</span>
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-600">
            © 2024 speesh.dev
          </p>
        </footer>
      </div>
    </div>
  );
} 