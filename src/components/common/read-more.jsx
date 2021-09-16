import ReadMoreReact from 'read-more-react';

const ReadMore = ({ text }) => (
  <ReadMoreReact 
    text={text}
    readMoreText='…more'
    min={200}
    ideal={300}
    max={400}
  />
);

export default ReadMore;