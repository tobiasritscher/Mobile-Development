import { useState, useEffect } from 'react'
import { Music } from '../types'

export const getMusicCategories = () => {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://nekos.best/api/v2/endpoints')
        const json = await response.json()
        setData(Object.keys(json))
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, isLoading }
}

export const getMusic = (category: string) => {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<Music[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://nekos.best/api/v2/${category}?amount=20`,
        )
        const json = await response.json()
        setData(json.results)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, isLoading }
}

export const getRandomMusic = () => {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<Music>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://nekos.best/api/v2/neko')
        const json = await response.json()
        setData(json.results[0])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, isLoading }
}
