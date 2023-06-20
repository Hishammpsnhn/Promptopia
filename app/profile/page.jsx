'use client'

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [posts, setPosts] = useState([])

  const handleEdit = (post) => {
    router.push(`update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete?')
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE',
        })
        const filteredPost = posts.filter((p) => p._id !== post._id)
        setPosts(filteredPost)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }
    if (session?.user.id) fetchPost()
  }, [session])
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
