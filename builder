#!/usr/bin/env bash
npm run build
echo
echo Sync .next/
rsync -a .next/ palermo:apps/chatbot-ui/.next/
echo
echo Restart App
ssh palermo 'systemctl --user restart mindbox_w3b_net'
ssh palermo 'journalctl --user -u mindbox_w3b_net -f'
