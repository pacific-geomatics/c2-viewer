PID=$(cat run/gunicorn/pid)
if [ $PID ]; then
	kill -TERM $PID
fi
rm -r -f run/gunicorn/
