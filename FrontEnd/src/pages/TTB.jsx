import { useState, useMemo } from 'react'
import { useParams, Link } from '@tanstack/react-router'
import { ArrowLeft, Mic, MicOff, BookOpen, Circle, Clock, Volume2 } from 'lucide-react'
import { sampleBooks, voiceOptions, DEFAULT_VOICE } from '../lib/utils'

const TTB = () => {
    const { bookId } = useParams({ strict: false })
    const [isListening, setIsListening] = useState(false)
    const [selectedVoice, setSelectedVoice] = useState(DEFAULT_VOICE)

    const book = useMemo(
        () => sampleBooks.find((b) => b._id === bookId),
        [bookId]
    )

    const voiceLabel = voiceOptions[selectedVoice]?.name ?? 'Unknown'

    if (!book) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-snap-text-secondary text-lg">Book not found</p>
                <Link
                    to="/dashboard/library"
                    className="text-snap-cyan hover:underline text-sm"
                >
                    Back to Library
                </Link>
            </div>
        )
    }

    return (
        <section className="w-full max-w-4xl mx-auto flex flex-col gap-6 animate-fade-in-up">

            {/* Back navigation */}
            <Link
                to="/dashboard/library"
                className="group flex items-center gap-2 text-snap-text-secondary hover:text-snap-text-primary transition-colors duration-200 w-fit -mb-2"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">Library</span>
            </Link>

            {/* ─── Book Info Header ─── */}
            <div className="glass-card p-5 md:p-7">
                <div className="flex flex-col sm:flex-row gap-5 md:gap-7">

                    {/* Cover thumbnail */}
                    <div className="shrink-0 self-center sm:self-start">
                        <div className="w-28 h-40 md:w-32 md:h-44 rounded-lg overflow-hidden shadow-lg shadow-black/30 ring-1 ring-white/5">
                            <img
                                src={book.coverURL}
                                alt={book.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Info + controls */}
                    <div className="flex-1 flex flex-col justify-between gap-4">

                        {/* Title block */}
                        <div>
                            <h1 className="text-2xl md:text-3xl font-semibold text-snap-text-primary leading-tight">
                                {book.title}
                            </h1>
                            <p className="text-snap-text-secondary text-sm mt-1">
                                by {book.author}
                            </p>
                        </div>

                        {/* Status pills */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            {/* Ready */}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-snap-mint/10 border border-snap-mint/20 text-snap-mint text-xs font-medium">
                                <Circle className="w-2.5 h-2.5 fill-snap-mint" />
                                Ready
                            </span>

                            {/* Voice */}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-snap-cyan/10 border border-snap-cyan/20 text-snap-cyan text-xs font-medium">
                                <Volume2 className="w-3.5 h-3.5" />
                                {voiceLabel}
                            </span>

                            {/* Timer */}
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-snap-gold/10 border border-snap-gold/20 text-snap-gold text-xs font-medium">
                                <Clock className="w-3.5 h-3.5" />
                                0:00 / 15:00
                            </span>
                        </div>

                        {/* Action row */}
                        <div className="flex items-center gap-3 mt-1">
                            {/* Read Book button */}
                            <Link
                                to="/dashboard/library"
                                className="btn-gradient inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
                            >
                                <BookOpen className="w-4 h-4" />
                                Read Book
                            </Link>

                            {/* Mic toggle */}
                            <button
                                onClick={() => setIsListening((prev) => !prev)}
                                className={`
                                    relative w-12 h-12 rounded-full flex items-center justify-center
                                    transition-all duration-300 cursor-pointer
                                    ${!isListening
                                        ? 'bg-snap-coral/20 border-2 border-snap-coral text-snap-coral shadow-[0_0_24px_-4px] shadow-snap-coral/40'
                                        : 'bg-white/5 border border-white/10 text-snap-text-secondary hover:bg-white/10 hover:text-snap-text-primary'
                                    }
                                `}
                                aria-label={isListening ? 'Stop listening' : 'Start listening'}
                            >
                                {!isListening
                                    ? <MicOff className="w-5 h-5" />
                                    : <Mic className="w-5 h-5" />
                                }
                                {!isListening && (
                                    <span className="absolute inset-0 rounded-full border-2 border-snap-coral animate-pulse-glow" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Conversation Panel ─── */}
            <div className="glass-card flex-1 min-h-[340px] md:min-h-[400px] flex flex-col">
                {/* Empty state */}
                <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-6 py-16">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                        <Mic className="w-6 h-6 text-snap-text-muted" />
                    </div>
                    <h2 className="text-lg font-semibold text-snap-text-primary">
                        No conversation yet
                    </h2>
                    <p className="text-snap-text-muted text-sm max-w-xs">
                        Click the mic button above to start talking about this book
                    </p>
                </div>
            </div>
        </section>
    )
}

export default TTB