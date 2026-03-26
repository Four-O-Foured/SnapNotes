import { useForm } from 'react-hook-form';
import RHFFileDrop from '../components/layout/RHFFileDrop';
import { Button } from '../components/ui/Button';
import { Upload, X, FileText, ArrowLeft, BookOpen, ImagePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, ACCEPTED_PDF_TYPES, voiceOptions } from '../lib/utils';
import { Link } from '@tanstack/react-router';
import api from '../api/axios';

const UploadBookPage = () => {
    const { control, register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            pdf: null,
            coverImage: null,
            title: '',
            author: '',
            category: '',
            persona: 'Rachel'
        }
    });

    const file = watch('pdf');
    const coverFile = watch('coverImage');
    const selectedPersona = watch('persona');

    const onSubmit = (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append('pdf', data.pdf);
        formData.append('coverImage', data.coverImage);
        formData.append('title', data.title);
        formData.append('author', data.author);
        formData.append('category', data.category);
        formData.append('persona', data.persona);
        api.post('/library/add-book', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className="w-full max-w-3xl mx-auto py-6 animate-fade-in-up">
            <div className="mb-8">
                <Link to="/dashboard/library" className="flex items-center gap-2 text-snap-text-muted hover:text-snap-cyan transition-colors w-fit mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Library
                </Link>
                <h1 className="text-3xl md:text-5xl julius-sans-one-regular tracking-tight text-white mb-2">Upload Book</h1>
                <p className="text-snap-text-secondary">Add a new document or book to your interactive library.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="glass-card p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-snap-text-secondary ml-1">Book Title</label>
                        <input
                            {...register('title', { required: true })}
                            className="w-full px-4 py-3 bg-snap-bg-panel/50 border border-white/10 rounded-xl focus:outline-none focus:border-snap-cyan/50 focus:ring-1 focus:ring-snap-cyan/20 transition-all text-white placeholder:text-snap-text-muted/50"
                            placeholder="e.g. The Great Gatsby"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-snap-text-secondary ml-1">Author Name</label>
                            <input
                                {...register('author', { required: true })}
                                className="w-full px-4 py-3 bg-snap-bg-panel/50 border border-white/10 rounded-xl focus:outline-none focus:border-snap-cyan/50 focus:ring-1 focus:ring-snap-cyan/20 transition-all text-white placeholder:text-snap-text-muted/50"
                                placeholder="e.g. F. Scott Fitzgerald"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-snap-text-secondary ml-1">Category</label>
                            <div className="relative">
                                <select
                                    {...register('category', { required: true })}
                                    className="w-full px-4 py-3 bg-snap-bg-panel/50 border border-white/10 rounded-xl focus:outline-none focus:border-snap-cyan/50 focus:ring-1 focus:ring-snap-cyan/20 transition-all text-white appearance-none"
                                >
                                    <option value="" disabled className="text-black">Select a genre</option>
                                    {[
                                        "Fiction", "Non-Fiction", "Science Fiction", "Fantasy",
                                        "Mystery", "Thriller", "Romance", "Horror",
                                        "Historical Fiction", "Biography", "Autobiography",
                                        "Self-Help", "Business", "Technology", "Health",
                                        "Education", "Children", "Young Adult", "Poetry",
                                        "Drama", "Other"
                                    ].map(cat => (
                                        <option key={cat} value={cat} className="text-black">{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <label className="text-sm font-medium text-snap-text-secondary ml-1">Reader Persona (Voice)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {Object.values(voiceOptions).map((voice) => (
                                <label
                                    key={voice.id}
                                    className={cn(
                                        "relative flex flex-col cursor-pointer rounded-xl border bg-snap-bg-panel/50 p-4 transition-all hover:bg-white/5",
                                        selectedPersona === voice.name
                                            ? "border-snap-cyan bg-snap-cyan/10 scale-[1.02] shadow-[0_0_15px_rgba(45,212,191,0.15)]"
                                            : "border-white/10"
                                    )}
                                >
                                    <input
                                        type="radio"
                                        {...register('persona', { required: true })}
                                        value={voice.name}
                                        className="sr-only"
                                    />
                                    <span className={cn(
                                        "text-sm font-bold mb-1",
                                        selectedPersona === voice.name ? "text-snap-cyan" : "text-white"
                                    )}>
                                        {voice.name}
                                    </span>
                                    <span className="text-xs text-snap-text-muted leading-relaxed">
                                        {voice.description}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <RHFFileDrop
                    name="pdf"
                    control={control}
                    multiple={false}
                    accept={ACCEPTED_PDF_TYPES.join(',')}
                >
                    {({ isDragging, file, removeFile, triggerBrowser }) => (
                        <div className="w-full">
                            <AnimatePresence mode="wait">
                                {file ? (
                                    <motion.div
                                        key="preview"
                                        className="glass-card-glow p-6 w-full flex items-center justify-between"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                    >
                                        <div className="flex items-center gap-4 truncate">
                                            <div className="w-12 h-12 rounded-xl bg-snap-cyan/10 flex items-center justify-center shrink-0">
                                                <FileText className="w-6 h-6 text-snap-cyan" />
                                            </div>
                                            <div className="truncate">
                                                <p className="text-white font-medium truncate">{file.name}</p>
                                                <p className="text-sm text-snap-text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); removeFile(); }}
                                            className="w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="dropzone"
                                        className={cn(
                                            "upload-zone p-8 md:p-12 text-center cursor-pointer group w-full",
                                            isDragging && "border-snap-cyan bg-snap-cyan/5"
                                        )}
                                        onClick={triggerBrowser}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-snap-cyan/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                <Upload className="w-8 h-8 text-snap-cyan" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-1">Upload PDF Document</h3>
                                                <p className="text-sm text-snap-text-muted">Click or drag and drop your book file here</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </RHFFileDrop>

                <RHFFileDrop
                    name="coverImage"
                    control={control}
                    multiple={false}
                    accept="image/*"
                    required={false}
                >
                    {({ isDragging, file: cFile, removeFile, triggerBrowser }) => (
                        <div className="w-full">
                            <AnimatePresence mode="wait">
                                {cFile ? (
                                    <motion.div
                                        key="preview-cover"
                                        className="glass-card-glow p-4 w-full flex items-center justify-between border-dashed border border-snap-cyan/30"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                    >
                                        <div className="flex items-center gap-4 truncate">
                                            <div className="w-10 h-10 rounded-lg bg-snap-cyan/10 flex items-center justify-center shrink-0">
                                                <ImagePlus className="w-5 h-5 text-snap-cyan" />
                                            </div>
                                            <div className="truncate">
                                                <p className="text-white text-sm font-medium truncate">{cFile.name}</p>
                                                <p className="text-xs text-snap-text-muted">Optional Custom Cover</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); removeFile(); }}
                                            className="w-7 h-7 rounded-full bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-all"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="dropzone-cover"
                                        className={cn(
                                            "upload-zone p-6 md:p-8 text-center cursor-pointer group w-full relative",
                                            isDragging && "border-snap-cyan bg-snap-cyan/5"
                                        )}
                                        onClick={triggerBrowser}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-2xl bg-snap-cyan/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                <ImagePlus className="w-6 h-6 text-snap-cyan" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-semibold text-white/80">Cover Image (Optional)</h3>
                                                <p className="text-xs text-snap-text-muted mt-1">Leave blank to auto-generate from PDF</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </RHFFileDrop>

                <div className="flex justify-end gap-4 mt-8">
                    <Link to="/dashboard/library">
                        <Button variant="ghost" type="button">Cancel</Button>
                    </Link>
                    <Button type="submit" className="btn-primary px-8 active:scale-95" >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Add to Library
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UploadBookPage;
