'use client'

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
  const { data: session } = useSession()
  console.log(session)

  const [posts, setPosts] = useState([])

  const handleEdit = () => {}

  const handleDelete = () => {}

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
