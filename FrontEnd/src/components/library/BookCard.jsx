import React from 'react'

const BookCard = ({ book }) => {
    return (
        <article className='flex p-5 flex-col items-center'>
            <figure className='w-56 h-84 mb-5 relative hover:scale-105 transition-all duration-300 '>
                <img src={book.coverURL} alt={book.title} className='w-full h-full object-cover rounded-sm' />
                <div className='absolute inset-0 lg:bg-black/50 hover:bg-transparent transition-all duration-300'></div>
            </figure>
            <figcaption className='flex flex-col text-center items-center'>
                <h2 className='text-xl font-bold'>{book.title}</h2>
                <p className='text-sm text-gray-500'>{book.author}</p>
            </figcaption>
        </article>
    )
}

export default BookCard