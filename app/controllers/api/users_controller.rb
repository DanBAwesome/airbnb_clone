module Api
  class UsersController < ApplicationController
    def create
    @user = User.new(user_params)

      if @user.save
        render 'api/users/create', status: :created
      else
        render json: { success: false }, status: :bad_request
      end
    end

    def update_avatar
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      user = session.user

      if user.avatar.attached?
        user.avatar.purge_later
      end

      if user.avatar.attach(params[:avatar]) 
        render json: { success: true }, status: :ok 
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :username)
    end
  end
end
