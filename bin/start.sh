branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
git pull origin $branch
mkdir -p run/gunicorn
gunicorn --pid run/gunicorn/pid -w 4 c2viewer:app &
