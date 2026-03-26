import React from 'react'
import { sampleBooks } from '../../lib/utils'
import BookCard from './BookCard'

const BookContainer = () => {
  return (
    <section className='w-full mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {sampleBooks.map((book) => (
                <BookCard key={book._id} book={book} />
            ))}
        </div>
    </section>
  )
}

export default BookContainer