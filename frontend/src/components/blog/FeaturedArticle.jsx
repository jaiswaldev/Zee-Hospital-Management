import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CalendarIcon } from "lucide-react";

const FeaturedArticle = ({ article }) => {
  const {
    title,
    excerpt,
    image,
    date,
    category,
    author,
    authorRole,
    authorImage
  } = article;

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl h-80">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 relative">
          <img
            src={image}
            alt={title}
            className="w-full h-64 md:h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
              {category}
            </Badge>
          </div>
        </div>

        <div className="md:w-1/2 p-3 md:p-10 flex flex-col justify-between ">
          <div>
            <div className="flex items-center text-gray-500 text-sm mb-4">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>{date}</span>
            </div>

            <div className="text-sm md:text-xl font-bold mb-4 text-gray-900 leading-tight">
              {title}
            </div>

            <div className="text-gray-600  text-sm leading-relaxed">
              {excerpt}
            </div>
          </div>

          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <img
                src={authorImage}
                alt={author}
                className="h-12 w-12 rounded-full mr-4 border-2 border-blue-100"
              />
              <div>
                <p className="font-semibold text-gray-900">{author}</p>
                <p className="text-sm text-gray-500">{authorRole}</p>
              </div>
            </div>

            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              aria-label="Read more about this article"
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;

// import React from "react";
// import { Button } from "../ui/button";
// import { Badge } from "../ui/badge";
// import { CalendarIcon } from "lucide-react";

// const FeaturedArticle = ({
//   title = "New Advanced MRI Technology Arrives at City Hospital",
//   excerpt = "ZeeCare has recently acquired state-of-the-art MRI technology that will significantly improve diagnostic capabilities and reduce scan times for patients. This investment represents our ongoing commitment to providing the highest quality care with cutting-edge medical technology.",
//   imageUrl = "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=80",
//   date = "April 15, 2023",
//   category = "Medical Research",
//   author = "Dr. Sarah Johnson",
//   authorRole = "Chief of Radiology",
//   authorImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
// }) => {
//   return (
//     <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
//       <div className="flex flex-col md:flex-row">
//         <div className="md:w-1/2">
//           <img
//             src={imageUrl}
//             alt={title}
//             className="w-full h-64 md:h-full object-cover"
//           />
//         </div>

//         <div className="md:w-3/4 p-6 md:p-8 flex flex-col justify-between flex-grow">
//           <div>
//             <div className="flex items-center justify-between mb-4">
//               <Badge variant="secondary" className="text-xs">
//                 {category}
//               </Badge>
//               <div className="flex items-center text-gray-500 text-sm">
//                 <CalendarIcon className="h-4 w-4 mr-1" />
//                 <span>{date}</span>
//               </div>
//             </div>

//             <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 break-words">
//               {title}
//             </h2>

//             <p className="text-gray-600 mb-6 break-words">{excerpt}</p>
//           </div>

//           <div className="flex items-center justify-between mt-4">
//             <div className="flex items-center">
//               <img
//                 src={authorImage}
//                 alt={author}
//                 className="h-10 w-10 rounded-full mr-3"
//               />
//               <div>
//                 <p className="font-medium text-gray-900">{author}</p>
//                 <p className="text-sm text-gray-500">{authorRole}</p>
//               </div>
//             </div>

//             <Button aria-label="Read more about this article">Read More</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedArticle;
