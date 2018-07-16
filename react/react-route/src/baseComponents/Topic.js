 import React from 'react'
const Topic = ({ match }) => (
  <div>
  Topic
    <h3>{match.params.topicId}</h3>
  </div>
)
export default Topic;