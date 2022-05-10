import { useState, useEffect } from 'react'
import { Music } from '../types'

export const getMusicCategories = () => {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<string[]>([])

  const fetchData = async () => {
    try {
      const response = await fetch('https://itunes.apple.com/search?term=categories')
      const json = await response.json()
      setData(Object.keys(json))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, isLoading }
}

export const getMusic = (category: string) => {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<Music[]>([])

  const fetchData = async () => {
    try {
      const response = await fetch(
          `https://itunes.apple.com/search?term=${category}&entity=song`,
      )
      const json = await response.json()
      setData(json.results)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, isLoading }
}
