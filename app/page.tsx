'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme/theme-toggle'
// import { useToast } from '@/components/ui/use-toast'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import {
  Sparkles,
  Zap,
  Clock,
  DollarSign,
  User,
  Copy,
  Download,
  TrendingUp,
  Target,
  Loader2,
  CheckCircle,
  AlertCircle,
  Code,
  Palette,
  Megaphone,
  FileText,
  BarChart3,
  Brain,
  ShieldCheck,
  SlidersHorizontal,
  Flame
} from 'lucide-react'
import { apiClient } from '@/lib/api'
import { UserRole } from '@/types'

interface PromptResponse {
  enhanced_prompt: string
  thinking_process: string
  original_tokens: number
  enhanced_tokens: number
  token_savings: number
  cost_savings_usd: number
  processing_time: number
  formatted_response: string
}

interface EnhancementStats {
  originalTokens: number
  enhancedTokens: number
  processingTime: number
  costDifference: number
  enhancementRatio: number
}

const userRoles = [
  { value: 'developer', label: 'Developer', icon: Code, color: 'bg-blue-500' },
  { value: 'designer', label: 'Designer', icon: Palette, color: 'bg-purple-500' },
  { value: 'marketer', label: 'Marketer', icon: Megaphone, color: 'bg-green-500' },
  { value: 'content_creator', label: 'Content Creator', icon: FileText, color: 'bg-pink-500' },
  { value: 'analyst', label: 'Analyst', icon: BarChart3, color: 'bg-indigo-500' },
  { value: 'general', label: 'General', icon: Brain, color: 'bg-gray-500' },
]

const optimizationLevels = [
  {
    value: 'conservative',
    label: 'Conservative',
    description: '100-150% expansion',
    icon: <ShieldCheck className="w-4 h-4 text-blue-500" />
  },
  {
    value: 'balanced',
    label: 'Balanced',
    description: '150-250% expansion',
    icon: <SlidersHorizontal className="w-4 h-4 text-orange-500" />
  },
  {
    value: 'aggressive',
    label: 'Aggressive',
    description: '200-400% expansion',
    icon: <Flame className="w-4 h-4 text-red-500" />
  }
]

// Markdown Renderer Component
const MarkdownRenderer = ({ content }: { content: string }) => (
  <div className="prose dark:prose-invert text-sm text-gray-700 dark:text-gray-300 scrollbar-thin max-h-96 overflow-y-auto">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  </div>
)
export default function HomePage() {
  const [prompt, setPrompt] = useState('')
  const [userRole, setUserRole] = useState('general')
  const [optimizationLevel, setOptimizationLevel] = useState('balanced')
  const [isLoading, setIsLoading] = useState(false)
  const [enhancedPrompt, setEnhancedPrompt] = useState('')
  const [stats, setStats] = useState<EnhancementStats | null>(null)
  const [showResults, setShowResults] = useState(false)
  // const { toast } = useToast()

  const handleEnhance = async () => {
    if (!prompt.trim()) {
      // toast({
      //   title: "Error",
      //   description: "Please enter a prompt to enhance.",
      //   variant: "destructive",
      // })
      return
    }

    setIsLoading(true)
    setShowResults(false)

    try {
      const response = await apiClient.enhancePrompt({
        original_prompt: prompt,
        user_role: userRole as UserRole,
        optimization_level: optimizationLevel,
      })

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to enhance prompt')
      }

      const data = response.data

      setEnhancedPrompt(data.enhanced_prompt)
      setStats({
        originalTokens: data.original_tokens,
        enhancedTokens: data.enhanced_tokens,
        processingTime: data.processing_time,
        costDifference: data.cost_savings_usd,
        enhancementRatio: (data.enhanced_tokens / data.original_tokens) * 100
      })
      setShowResults(true)

      // toast({
      //   title: "Success!",
      //   description: "Your prompt has been enhanced successfully.",
      // })
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to enhance prompt. Please try again.",
      //   variant: "destructive",
      // })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // toast({
    //   title: "Copied!",
    //   description: "Enhanced prompt copied to clipboard.",
    // })
  }

  const downloadAsFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const selectedRole = userRoles.find(role => role.value === userRole)
  const selectedOptimization = optimizationLevels.find(level => level.value === optimizationLevel)

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="border-b border-white/20 dark:border-gray-800/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Prompt Enhancer
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Transform your prompts into professional instructions
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-orange-500" />
                  <span>Enhance Your Prompt</span>
                </CardTitle>
                <CardDescription>
                  Enter your basic prompt and select your role and optimization level
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Role Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Your Role</label>
                  <Select value={userRole} onValueChange={setUserRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {userRoles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${role.color}`} />
                            <span>{role.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Optimization Level */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Optimization Level</label>
                  <Select value={optimizationLevel} onValueChange={setOptimizationLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select optimization level" />
                    </SelectTrigger>
                    <SelectContent>
                      {optimizationLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          <div className="flex items-center space-x-2">
                            {level.icon}
                            <div className="flex flex-col text-start">
                              <span className="font-medium">{level.label}</span>
                              <span className="text-xs text-gray-500">{level.description}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Prompt Input */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Original Prompt</label>
                  <Textarea
                    placeholder="Enter your basic prompt here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{prompt.length} characters</span>
                    <span>~{Math.max(1, Math.ceil(prompt.length / 4))} tokens</span>
                  </div>
                </div>

                {/* Enhance Button */}
                <Button
                  onClick={handleEnhance}
                  disabled={isLoading || !prompt.trim()}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Enhance Prompt
                    </>
                  )}
                </Button>

                {/* Current Settings Display */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <Badge  className="flex items-center space-x-1">
                    {selectedRole && <selectedRole.icon className="h-3 w-3" />}
                    <span>{selectedRole?.label}</span>
                  </Badge>
                  <Badge className="flex items-center space-x-1">
                    {selectedOptimization && optimizationLevels.find(l => l.value === selectedOptimization.value)?.icon}
                    <span>{selectedOptimization?.label}</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {showResults && stats && (
              <>
              {/* Enhanced Prompt Display */}
              <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-orange-500" />
                        <span>Enhanced Prompt</span>
                      </span>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(enhancedPrompt)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadAsFile(enhancedPrompt, 'enhanced-prompt.txt')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      {/* <pre className="text-sm text-gray-700 dark:text-gray-300 scrollbar-thin max-h-96 overflow-y-auto"> */}
                      <MarkdownRenderer content={enhancedPrompt} />
                      {/* </pre> */}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                      <span>{enhancedPrompt.length} characters</span>
                      <span>~{stats.enhancedTokens} tokens</span>
                    </div>
                  </CardContent>
                </Card>
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="glass">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Enhancement Ratio</p>
                          <p className="text-2xl font-bold text-orange-500">
                            {stats.enhancementRatio.toFixed(1)}%
                          </p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-orange-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Processing Time</p>
                          <p className="text-2xl font-bold text-blue-500">
                            {stats.processingTime.toFixed(2)}s
                          </p>
                        </div>
                        <Clock className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Token Expansion</p>
                          <p className="text-2xl font-bold text-green-500">
                            +{stats.enhancedTokens - stats.originalTokens}
                          </p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Cost Impact</p>
                          <p className="text-2xl font-bold text-purple-500">
                            ${Math.abs(stats.costDifference).toFixed(6)}
                          </p>
                        </div>
                        <DollarSign className="h-8 w-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>


              </>
            )}

            {!showResults && (
              <Card className="glass">
                <CardContent className="p-12 text-center">
                  <div className={`animate-pulse-slow mb-4 ${isLoading ? 'animate-spin' : ''}`}>
                    <Sparkles className="h-16 w-16 text-orange-500 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ready to Enhance</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter your prompt and click "Enhance Prompt" to get started
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Why Use Prompt Enhancer?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Transform your simple prompts into professional, comprehensive instructions that deliver better AI results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass">
              <CardContent className="p-6 text-center">
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full w-fit mx-auto mb-4">
                  <Brain className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="font-semibold mb-2">Role-Specific Enhancement</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tailored enhancements based on your professional role and specific needs
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-fit mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2">Optimization Levels</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose from conservative to aggressive enhancement levels
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6 text-center">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-fit mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="font-semibold mb-2">Instant Results</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get professionally enhanced prompts in seconds with detailed analytics
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}