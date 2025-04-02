import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Upload as UploadIcon,
  File,
  XCircle,
  Check,
  Image,
  Code,
  FileText,
  AlertTriangle,
  Plus,
  X
} from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

const Upload = () => {
  const [projectType, setProjectType] = useState<'hackathon' | 'case-competition'>('hackathon');
  const [files, setFiles] = useState<File[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [projectTags, setProjectTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [contentType, setContentType] = useState<'free' | 'premium' | 'ultra'>('free');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [ipConfirmed, setIpConfirmed] = useState(false);
  
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnailPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files || [])]);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };
  
  const handleAddTag = () => {
    if (tagInput && !projectTags.includes(tagInput)) {
      setProjectTags(prev => [...prev, tagInput]);
      setTagInput('');
    }
  };
  
  const removeTag = (tag: string) => {
    setProjectTags(prev => prev.filter(t => t !== tag));
  };
  
  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4); // Move to success step
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Upload Your Project</h1>
            <p className="text-gray-600">
              Share your hackathon project or case competition solution with the community
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-10">
            <div className="w-full max-w-lg flex items-center">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex-1 flex items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      s < step ? 'bg-green-500 text-white' :
                      s === step ? 'bg-deckit-purple text-white' :
                      'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s < step ? <Check size={16} /> : s}
                  </div>
                  {s < 4 && (
                    <div 
                      className={`h-1 flex-grow ${
                        s < step ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Step 1: Project Details */}
          {step === 1 && (
            <>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input id="title" placeholder="Enter project title" />
                </div>
                
                <div className="space-y-2">
                  <Label>Project Type</Label>
                  <RadioGroup 
                    defaultValue={projectType} 
                    className="flex flex-col sm:flex-row gap-4"
                    onValueChange={(value) => setProjectType(value as 'hackathon' | 'case-competition')}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hackathon" id="hackathon" />
                      <Label htmlFor="hackathon">Hackathon Project</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="case-competition" id="case-competition" />
                      <Label htmlFor="case-competition">Case Competition</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your project" 
                    className="min-h-32"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Project Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {projectTags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <XCircle 
                          size={14} 
                          className="cursor-pointer"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      id="tags" 
                      placeholder="Add tags (e.g., AI, Healthcare, etc.)" 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handleAddTag}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Thumbnail Image</Label>
                  {thumbnailPreview ? (
                    <div className="relative h-48 w-full">
                      <img 
                        src={thumbnailPreview} 
                        alt="Thumbnail preview" 
                        className="h-full w-full object-cover rounded-lg"
                      />
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={removeThumbnail}
                      >
                        <XCircle size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="thumbnail-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-deckit-purple hover:text-deckit-purple-dark mx-auto"
                        >
                          <span>Upload a thumbnail</span>
                          <input
                            id="thumbnail-upload"
                            name="thumbnail-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleThumbnailChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button onClick={nextStep}>
                  Continue
                </Button>
              </div>
            </>
          )}
          
          {/* Step 2: Project Content */}
          {step === 2 && (
            <>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Content Access Type</Label>
                  <RadioGroup 
                    defaultValue={contentType} 
                    className="space-y-4"
                    onValueChange={(value) => setContentType(value as 'free' | 'premium' | 'ultra')}
                  >
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="free" id="free" className="mt-1" />
                      <div>
                        <Label htmlFor="free" className="font-medium">Free Content</Label>
                        <p className="text-sm text-gray-500">Your project will be freely available to all users</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="premium" id="premium" className="mt-1" />
                      <div>
                        <Label htmlFor="premium" className="font-medium">Premium Content</Label>
                        <p className="text-sm text-gray-500">Available to users with a paid subscription</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value="ultra" id="ultra" className="mt-1" />
                      <div>
                        <Label htmlFor="ultra" className="font-medium">Ultra Premium Content</Label>
                        <p className="text-sm text-gray-500">Requires an additional fee on top of subscription</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                {(contentType === 'premium' || contentType === 'ultra') && (
                  <div className="space-y-2">
                    <Label htmlFor="price">Content Price (USD)</Label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input
                        type="number"
                        id="price"
                        placeholder="0.00"
                        className="pl-8"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    {contentType === 'ultra' && (
                      <p className="text-sm text-amber-600">
                        Ultra Premium content should provide exceptional value beyond standard premium content.
                      </p>
                    )}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label>Upload Project Files</Label>
                  <Tabs defaultValue="files" className="mt-2">
                    <TabsList>
                      <TabsTrigger value="files">Files & Documents</TabsTrigger>
                      <TabsTrigger value="code">Code Repository</TabsTrigger>
                    </TabsList>
                    <TabsContent value="files" className="space-y-4 pt-4">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="files-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-deckit-purple hover:text-deckit-purple-dark mx-auto"
                          >
                            <span>Upload project files</span>
                            <input
                              id="files-upload"
                              name="files-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleFileChange}
                              multiple
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          PDF, PPTX, ZIP, images, and other files up to 50MB each
                        </p>
                      </div>
                      
                      {files.length > 0 && (
                        <div className="space-y-2 mt-4">
                          <Label>Uploaded Files</Label>
                          <div className="space-y-3">
                            {files.map((file, index) => (
                              <div 
                                key={index} 
                                className="flex items-center justify-between p-3 border rounded-lg"
                              >
                                <div className="flex items-center">
                                  <File className="h-5 w-5 text-gray-500 mr-2" />
                                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                  <span className="text-xs text-gray-500 ml-2">
                                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                  </span>
                                </div>
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => removeFile(index)}
                                >
                                  <XCircle size={16} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="code" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="repo-url">Repository URL</Label>
                        <Input 
                          id="repo-url" 
                          placeholder="https://github.com/username/repository" 
                        />
                        <p className="text-sm text-gray-500">
                          Add a link to your GitHub, GitLab, or other code repository
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="code-snippet">Code Snippet Preview</Label>
                        <Textarea 
                          id="code-snippet" 
                          placeholder="Paste a sample of your code that will be shown as a preview to users" 
                          className="font-mono text-sm h-40"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={nextStep}>
                  Continue
                </Button>
              </div>
            </>
          )}
          
          {/* Step 3: Legal & Review */}
          {step === 3 && (
            <>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Important Legal Information</h3>
                          <p className="text-sm text-gray-600">
                            Please review and confirm your agreement to our terms before uploading your project.
                          </p>
                        </div>
                      </div>
                      
                      <div className="pt-4 space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="terms" 
                            checked={termsAgreed}
                            onCheckedChange={() => setTermsAgreed(!termsAgreed)}
                          />
                          <div>
                            <Label htmlFor="terms" className="text-sm font-normal">
                              I agree to DeckIt's <a href="/terms" className="text-deckit-purple hover:underline">Terms of Service</a> and <a href="/privacy" className="text-deckit-purple hover:underline">Privacy Policy</a>
                            </Label>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="ip" 
                            checked={ipConfirmed}
                            onCheckedChange={() => setIpConfirmed(!ipConfirmed)}
                          />
                          <div>
                            <Label htmlFor="ip" className="text-sm font-normal">
                              I confirm that I have the necessary rights to share this project, and that it does not violate any hackathon/competition rules or third-party intellectual property rights
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-2">
                  <Label htmlFor="license">Choose a License</Label>
                  <Select defaultValue="mit">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a license" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mit">MIT License</SelectItem>
                      <SelectItem value="apache">Apache License 2.0</SelectItem>
                      <SelectItem value="gpl">GNU General Public License v3.0</SelectItem>
                      <SelectItem value="cc-by">Creative Commons Attribution 4.0</SelectItem>
                      <SelectItem value="cc-by-sa">Creative Commons Attribution-ShareAlike 4.0</SelectItem>
                      <SelectItem value="proprietary">Proprietary (All Rights Reserved)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">
                    The license determines how others can use your project. <a href="/licenses" className="text-deckit-purple hover:underline">Learn more about licenses</a>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Add any special instructions or notes about your project" 
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={!termsAgreed || !ipConfirmed || isSubmitting}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? 'Uploading...' : 'Upload Project'}
                  {isSubmitting ? (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <UploadIcon size={16} />
                  )}
                </Button>
              </div>
            </>
          )}
          
          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-10">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Project Successfully Uploaded!</h2>
              <p className="text-gray-600 max-w-lg mx-auto mb-8">
                Your project has been uploaded and is now being reviewed. Once approved, it will be available on DeckIt.
              </p>
              <div className="space-y-4">
                <Button className="w-full sm:w-auto" asChild>
                  <RouterLink to="/profile">View My Projects</RouterLink>
                </Button>
                <div className="flex justify-center">
                  <Button variant="link" asChild>
                    <RouterLink to="/">Return to Home</RouterLink>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Upload;
