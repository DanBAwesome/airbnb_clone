module Api
    class PropertiesController < ApplicationController
        def index
            @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
            return render json: { error: 'not found' }, status: :not_found if !@properties

            render 'api/properties/index', status: :ok
        end

        def show
            @property = Property.find_by(id: params[:id])
            return render json: { error: 'not found' }, status: :not_found if !@property

            render 'api/properties/show', status: :ok
        end

        def create
            token = cookies.signed[:airbnb_session_token]
            session = Session.find_by(token: token)

            return render json: { error: 'user not logged in' }, status: :unauthorized if !session
            user = session.user

            begin
                @property = user.properties.new(property_params)

                if @property.save
                    render 'api/properties/create', status: :created
                end

            rescue ArgumentError => e 
                render json: { error: e.message }, status: :bad_request
            end
        end

        def owned_properties
            token = cookies.signed[:airbnb_session_token]
            session = Session.find_by(token: token)

            return render json: { error: 'user not logged in' }, status: :unauthorized if !session
            
            @properties = Property.where('user_id == ?', session.user_id).order(created_at: :desc).page(params[:page]).per(6)

            render 'api/properties/index', status: :ok
        end

        def show_owned_property
            token = cookies.signed[:airbnb_session_token]
            session = Session.find_by(token: token)

            return render json: { error: 'user not logged in' }, status: :unauthorized if !session

            @property = Property.find_by(id: params[:id])
            return render json: { error: 'user cannot access this property' }, status: :unauthorized if @property.user.id != session.user_id
            return render json: { error: 'not found' }, status: :not_found if !@property

            render 'api/properties/show', status: :ok
        end

        private

        def property_params
            params.require(:property).permit(:image_url, :title, :description, :property_type, :city, :country, :price_per_night, :max_guests, :bedrooms, :beds, :baths)
        end
    end
end