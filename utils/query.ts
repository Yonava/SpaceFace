import {
  Room,
  RoomType,
  SpaceProviderType,
  SpaceProvider,
  BlockMapType,
  BlockMap
} from './ZodTypes'
import { useFetch } from '@vueuse/core'

//Query SpaceProvider
export async function fetchSpaceProvider(q: string | null): Promise<SpaceProviderType | null> {
  //Make sure we don't query a null string
  if (!q) q = ''
  const { data } = await useFetch<string>(
    `https://spaceprovider.up.railway.app/api/v1?q=${q}&page=1&limit=10`
  ).get()
  // if (!data) throw new Error('No data found')
  return SpaceProvider.parse(JSON.parse(data.value ?? ''))
}

export async function fetchCompleteSpaceProvider(id: string): Promise<RoomType> {
  if (!id) id = ''

  const { data } = await useFetch<string>(
    `https://spaceprovider.up.railway.app/api/v1?_id=${id}`
  ).get()
  // if (!data) throw new Error('No data found')
  return Room.parse(JSON.parse(data.value ?? ''))
}

//Query BlockMap
export async function fetchBlockMap(roomId: string | null): Promise<BlockMapType | null> {
  //Make sure we don't query a null string
  if (!roomId) roomId = ''
  const { data } = await useFetch<string>(
    `https://blockmap.onrender.com/room?roomId=${roomId}`
  ).get()
  // if (!data) throw new Error('No data found')
  return BlockMap.parse(JSON.parse(data.value ?? ''))
}
