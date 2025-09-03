import bcrypt from 'bcryptjs'

const password = process.argv[2] 

if (!password) {
  console.log("❌ Usage: node src/utils/hashPassword.js <your-password>")
  process.exit(1)
}

const saltRounds = 10

bcrypt.hash(password, saltRounds).then(hash => {
  console.log(`✅ Plain: ${password}`)
  console.log(`🔑 Hash:  ${hash}`)
  process.exit()
})