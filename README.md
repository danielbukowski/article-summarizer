# Article Summarizer

A simple app made in Node.js to summarize an article


## API Reference

#### Summarize an article

```http
  POST /summarize
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `url` | `string` | **Required**. **Must starts with 'https://' prefix.** URL to an article |
| `modelName` | `string` | **Required**. Available model names are ["gpt-3.5-turbo","gpt-4o","gpt-4-turbo"] |
| `numberOfSentences`      | `number` | **Required**. Range from 2 to 23 |


## Environment Variables

`SERVER_PORT`

`OPENAI_API_KEY`
