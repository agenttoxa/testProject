const { Router } = require('express')
const path = require('path')
const fs = require('fs')

const router = new Router()

router.put('/news', async (req, res, next) => {
  try {
    const filePath = path.join(__dirname, './../../static/api/news.json')

    let file = fs.readFileSync(filePath)
    let arrayNews = JSON.parse(file)
    await arrayNews.forEach((item, index) => {
      if (item.id === req.body.newsItem.id) {
        arrayNews[index] = req.body.newsItem
      }
    })

    fs.writeFileSync(filePath, JSON.stringify(arrayNews))
  } catch (errors) {
    res.json({
      'errors': errors
    })
  }

  res.json({
    'status': 200
  })
})

module.exports = router
