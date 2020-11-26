const path = require('path')

const file = require.context('./', true, /\.vue/)
const components = {}
file.keys().forEach(key => {
    const name = path.basename(key, '.vue')
    components[name] = file(key).default || file(key)
})

export default components
