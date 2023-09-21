import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function LoadingHomePosts(){
    return(
        <main className="w-full px-4 mt-4">
            <div className="flex flex-col gap-y-2">
                <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
                {/* <SkeletonTheme baseColor="#202020" highlightColor="#444"> */}
                <Skeleton height={300} />
                <Skeleton width={220}/>
                <Skeleton height={45} width={420}/>
                <Skeleton count={3}/>
                <div className="flex items-center gap-x-2">
                <Skeleton inline="true" width={100}/>
                <Skeleton inline="true" width={100}/>
                <Skeleton inline="true" width={100}/>
                </div>
                </SkeletonTheme>
            </div>
            <div className="flex flex-col gap-y-2 mt-6">
            {/* <SkeletonTheme baseColor="#202020" highlightColor="#444"> */}
            <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
                <Skeleton height={300} />
                <Skeleton width={220}/>
                <Skeleton height={45} width={420}/>
                <Skeleton count={3}/>
                <div className="flex items-center gap-x-2">
                <Skeleton inline="true" width={100}/>
                <Skeleton inline="true" width={100}/>
                <Skeleton inline="true" width={100}/>
                </div>
                </SkeletonTheme>
            </div>
        </main>
    )
}