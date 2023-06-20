'use client'

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = ({params}) => {
  const searchPrams = useSearchParams()
  const name = searchPrams.get('name')

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }
    fetchPost()
  }, [])
  return (
    <Profile
      name={name}
      desc={`Welcome to ${name} personalized profile page`}
      data={posts}
      //   handleEdit={handleEdit}
      //   handleDelete={handleDelete}
    />
  )
}

export default page
