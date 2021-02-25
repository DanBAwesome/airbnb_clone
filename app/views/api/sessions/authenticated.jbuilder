json.authenticated true
json.username @user.username
if @user.avatar.attached?
    json.avatar url_for(@user.avatar)
else
    json.avatar nil
end
