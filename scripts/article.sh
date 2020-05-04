path='./articles'

if [ $# -gt 0 ]; then
  path="$path/$1"
fi

echo "export const meta = {
  title: 'Untitled',
  description: 'Undescribed',
  created: '$(date +'%Y-%m-%d')'
}

" >> $(date +"$path/%y%m%d.mdx")