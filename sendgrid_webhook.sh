function localtunnel {
  lt --port 5555 --subdomain apirtcnlfhwuix782305t629
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
