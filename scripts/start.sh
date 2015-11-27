git pull origin master
mkdir -p run/gunicorn
gunicorn --pid run/gunicorn/pid -w 4 c2viewer:app &
