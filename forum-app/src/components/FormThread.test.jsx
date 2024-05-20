// eslint-disable-next-line no-unused-vars
import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FormThread from './FormThread'
import { createThread } from '../utils/data'
import { showToast } from '../utils/toast'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../utils/data', () => ({
  createThread: vi.fn()
}))

vi.mock('../utils/toast', () => ({
  showToast: vi.fn()
}))

describe('FormThread', () => {
  it('should display validation errors', async () => {
    render(
      <MemoryRouter>
        <FormThread />
      </MemoryRouter>
    )
    act(() => {
        fireEvent.click(screen.getByText('Buat'))
    })

    expect(showToast).toHaveBeenCalledWith('Gagal membuat diskusi! judul tidak ada', 'white', 'red')
  })

  it('should call createThread with correct data', async () => {
    createThread.mockResolvedValue({ error: false })

    render(
      <MemoryRouter>
        <FormThread />
      </MemoryRouter>
    )

    await act(async () => {
        fireEvent.change(screen.getByLabelText('Judul'), { target: { value: 'Test Title' } })
        fireEvent.change(screen.getByLabelText('Kategori'), { target: { value: 'Test Category' } })
        fireEvent.change(screen.getByLabelText('Deskripsi'), { target: { value: 'Test Body' } })
        fireEvent.click(screen.getByText('Buat'))
    })

    expect(createThread).toHaveBeenCalledWith({ title: 'Test Title', body: 'Test Body', category: 'Test Category' })
    expect(showToast).toHaveBeenCalledWith('Gagal membuat diskusi! judul tidak ada', 'white', 'red')
  })

  it('should handle createThread error', async () => {
    createThread.mockResolvedValue({ error: true, message: 'Error message' })

    render(
      <MemoryRouter>
        <FormThread />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: 'Test Title' } })
    fireEvent.change(screen.getByLabelText('Kategori'), { target: { value: 'Test Category' } })
    fireEvent.change(screen.getByLabelText('Deskripsi'), { target: { value: 'Test Body' } })

    fireEvent.click(screen.getByText('Buat'))

    expect(showToast).toHaveBeenCalledWith('Gagal membuat diskusi! judul tidak ada', 'white', 'red')
  })
})
