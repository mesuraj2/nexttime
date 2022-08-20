export default function handler(req, res) {
    let date=new Date()

    res.status(200).json({ time: date })
  }