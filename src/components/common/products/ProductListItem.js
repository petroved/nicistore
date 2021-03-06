/**
 * Imports
 */
import React from 'react';
import { FormattedMessage, FormattedNumber, injectIntl, intlShape } from 'react-intl';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {slugify} from '../../../utils/strings';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Text from '../typography/Text';

/**
 * Component
 */
class ProductListItem extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired,
        intl: intlShape.isRequired,
    };

    //*** Initial State ***//

    state = {
        productPlaceholderImage: undefined
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ProductListItem.scss');

        // Load static files
        this.setState({
            productPlaceholderImage: require('../images/image_placeholder.png')
        });
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let locale = this.context.intl.locale;

        //
        // Return
        //
        return (
            <div className="product-list-item" itemScope itemType="http://schema.org/Product" itemRef='brand-schema'>
                <Link to={`/${locale}/products/${this.props.product.id}/${slugify(this.props.product.name[locale])}`}>
                    <div className="product-list-item__image">
                        {this.props.product.images && this.props.product.images.length > 0 ?
                            <span style={{display: 'none'}} itemProp="image">
                                {`//${this.props.product.images[0].url}`}
                            </span>
                            :
                            null
                        }
                        {this.props.product.images && this.props.product.images.length > 0 ?
                            <img src={`//${this.props.product.images[0].url}`} />
                            :
                            <img src={this.state.productPlaceholderImage} />
                        }
                    </div>
                    <div className="product-list-item__name" itemProp="name">
                        <Text size="small">
                            {this.props.product.name[locale]}
                        </Text>
                        <span style={{display: 'none'}} itemProp="sku">{this.props.product.sku}</span>
                    </div>
                    {this.props.product.pricing ?
                        <div className="product-list-item__price" itemProp="offers" itemScope itemType="http://schema.org/Offer">
                            <div style={{display: 'none'}} itemProp="price">
                                {this.props.product.pricing.retail}
                            </div>
                            <div style={{display: 'none'}} itemProp="priceCurrency">
                                {this.props.product.pricing.currency}
                            </div>
                            <div>
                                <Text size="medium" weight="bold">
                                    <FormattedNumber
                                        value={this.props.product.pricing.retail}
                                        style="currency"
                                        currency={this.props.product.pricing.currency} />
                                </Text>
                            </div>
                        </div>
                        :
                        null
                    }
                </Link>
            </div>
        );
    }
}

/**
 * Exports
 */
export default ProductListItem;
