import ReadMoreReact from 'read-more-react';

const ReadMore = ({ text }) => (
	<ReadMoreReact
		text={text}
		readMoreText='…more'
		min={300}
		ideal={400}
		max={500}
	/>
);

export default ReadMore;
