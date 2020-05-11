path='./articles'

if [ $# -gt 0 ]; then
  path="$path/$1"
fi

file=$(date +"$path/%y%m%d.mdx")

echo "export const meta = {
  title: 'Untitled',
  description: 'Undescribed',
  created: '$(date +'%Y-%m-%d')'
}

" >> $file

code $file