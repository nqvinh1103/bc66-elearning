import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { courseApi } from '../../apis/course.api'

export const RenderCourseCatalog = () => {
    const {maDanhMuc} = useParams()
    const {data, loading, error} = useQuery({
        queryKey: ["course-catalog"],
        queryFn: () => courseApi.getCourseCatalog(maDanhMuc),
    })
    console.log(data);
  return (
    <div></div>
  )
}
