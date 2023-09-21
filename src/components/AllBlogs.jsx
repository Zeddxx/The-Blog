import blog1 from "../assets/blog1.png";
import blog2 from "../assets/blog2.png";
import blog3 from "../assets/blog3.png";
import blog4 from "../assets/blog4.png";
import blog5 from "../assets/blog5.png";
import blog6 from "../assets/blog6.png";
import {IF} from '../url.js'

export default function AllBlogs({post}) {
  // const postsData = [
  //   {
  //     "image": blog1,
  //     "title": "Bill Walsh leadership lessons",
  //     "description":
  //       "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
  //     "date": "Sunday , 1 Jan 2023",
  //     "tags": ["Leadership", "Management", "Presentation"],
  //   },
  //   {
  //     "image": blog2,
  //     "title": "PM mental models",
  //     "description":
  //       "Mental models are simple expressions of complex processes or relationships.",
  //     "date": "Sunday , 1 Jan 2023",
  //     "tags": ["Product", "Research", "Frameworks"],
  //   },
  //   {
  //     "image": blog3,
  //     "title": "What is Wireframing?",
  //     "description":
  //       "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
  //     "date": "Sunday , 1 Jan 2023",
  //     "tags": ["Design", "Research", "Presentation"],
  //   },
  //   {
  //     "image": blog4,
  //     "title": "How collaboration makes us better designers",
  //     "description":
  //       "Collaboration can make our teams stronger, and our individual designs better.",
  //     "date": "Sunday , 1 Jan 2023",
  //     "tags": ["Design", "Research", "Presentation"],
  //   },
  //   {
  //     "image": blog5,
  //     "title": "Our top 10 Javascript frameworks to use",
  //     "description":
  //       "JavaScript frameworks make development easy with extensive features and functionalities.",
  //     "date": "Sunday , 1 Jan 2023",
  //     "tags": ["Software Development", "Tools", "SaaS"],
  //   },
  //   {
  //     "image": blog6,
  //     "title": "Podcast: Creating a better CX Community",
  //     "description":
  //       "Starting a community doesn’t need to be complicated, but how do you get started?",
  //     "date": "Sunday , 1 Jan 2023",
  //     "tags": ["Podcasts", "Customer Success", "Presentation"],
  //   }
  // ];

  return (
    // <div className="w-full flex flex-wrap gap-6">
        <div className="sm:h-[26rem] shrink-0 min-w-[18rem] md:min-w-[22rem] max-w-full flex-1">
          <div className="flex h-1/2">
            <img
              // src={post.image}
              src={IF + post.photo}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col h-1/2">
            <p className="text-indigo-800 font-semibold text-sm mt-2">
              Sun, 12 2023
            </p>
            <h2 className="sm:mt-2 text-xl font-semibold h-14 flex items-center">{post.title.length > 50 ? post.title.slice(0, 50) + '...' : post.title}</h2>
            <p className="sm:mt-2 text-gray-500 h-20">{post.description.length > 110 ? post.description.slice(0, 110) + ' ...Read more' : post.description}</p>
            <div className="sm:mt-4 flex items-center gap-x-2 gap-y-6 overflow-hidden">
              {post.categories?.map((tag, tagIndex) => {
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
    // </div>
  );
}
