import blog1 from "../assets/blog1.png";
import blog2 from "../assets/blog2.png";
import { IF } from '../url.js'

export default function ProfilePost({p}){
    const postsData = [
        {
          "image": blog1,
          "title": "Bill Walsh leadership lessons",
          "description":
            "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
          "date": "Sunday , 1 Jan 2023",
          "tags": ["Leadership", "Management", "Presentation"],
        },
        {
          "image": blog2,
          "title": "PM mental models",
          "description":
            "Mental models are simple expressions of complex processes or relationships.",
          "date": "Sunday , 1 Jan 2023",
          "tags": ["Product", "Research", "Frameworks"],
        },
    ]
    return(
        <div className="sm:h-[26rem] shrink-0 min-w-[18rem] md:min-w-[22rem] max-w-full flex-1">
          <div className="flex h-1/2">
            <img
              src={IF + p.photo}
              alt={p.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col h-1/2">
            <p className="text-indigo-800 font-semibold text-sm mt-2">
              {new Date(p.updatedAt).toString().slice(0, 3) + ',' + new Date(p.updatedAt).toString().slice(3, 16)}
            </p>
            <h2 className="sm:mt-2 text-xl font-semibold h-14 flex items-center">{p.title.length > 50 ? p.title.slice(0, 50) + '...' : p.title}</h2>
            <p className="sm:mt-2 text-gray-500 h-20">{p.description.length > 110 ? p.description.slice(0, 110) + ' ...Read more' : p.description}</p>
            <div className="sm:mt-4 flex items-center gap-x-2 gap-y-6 overflow-hidden">
              {p.categories?.map((tag, tagIndex) => {
              return(
                <span
                  key={tagIndex}
                  className={`${tagIndex === 0 ? 'text-purple-700 bg-purple-400/20' : 'text-red-700 bg-red-400/20'} ${tagIndex === 2 ? 'text-indigo-700 bg-indigo-400/20' : ''}  px-4 rounded-full text-sm py-1`}
                >
                  {tag.length > 9 ? tag.slice(0, 10) + '...' : tag}
                </span>
              )})}
            </div>
          </div>
        </div>
    )
}